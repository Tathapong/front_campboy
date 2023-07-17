import { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Button from "../../../components/button/Button";
import IconText from "../../../components/iconText/IconText";
import OptionDropdown from "../../../components/optionDropdown/OptionDropdown";
import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import Textarea from "../../../components/textarea/Textarea";

import { thunk_commentToggleLike, thunk_deleteComment, thunk_updateComment } from "../../../stores/blogSlice";
import { selectMe } from "../../../stores/myUserSlice";

import { timeSince } from "../../../utilities/dateFormat";
import { useClickOutSide } from "../../../hooks/useClickOutside";
import { isNotEmpty } from "../../../validation/validation";

function BlogCommentCard(props) {
  const { comment } = props;

  const params = useParams();
  const dispatch = useDispatch();

  const [dropdown, setDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [errorInput, setErrorInput] = useState("");

  const dropdownEl = useClickOutSide(useCallback(closeDropdown, []));
  const commentInputEl = useRef(null);
  const commentEl = useRef(null);

  const myUser = useSelector(selectMe);

  const { blogId } = params;
  const date = timeSince(comment.createdAt);

  useEffect(() => {
    setCommentInput(JSON.parse(comment.contentText));
  }, [comment.contentText]);

  function closeDropdown() {
    setDropdown(false);
  }

  function toggleDropdown() {
    setDropdown((previous) => !previous);
  }

  function handleOnChangeCommentInput(ev) {
    setCommentInput(ev.target.value);
  }

  async function handleOnClickCommentLike() {
    try {
      await dispatch(thunk_commentToggleLike(comment.id));
    } catch (error) {
      console.log(error);
    }
  }

  function handleOnClickEditButton() {
    commentInputEl.current.style.height = commentEl.current.scrollHeight + 20 + "px";
    setIsEditing(true);
    closeDropdown();
  }

  function handleOnClickDeleteButton() {
    setIsDeleting(true);
    closeDropdown();
  }

  function handleOnClickCancelEditSpan() {
    setIsEditing(false);
    setCommentInput(JSON.parse(comment.contentText));
    setErrorInput("");
  }

  function handleKeyUpCancelEdit(ev) {
    if (ev.keyCode === 27) {
      handleOnClickCancelEditSpan();
    }
  }

  async function handleOnClickSaveEditButton(ev) {
    try {
      ev.preventDefault();
      const title = JSON.stringify(commentInput.replace(/\n+/g, "\n"));

      //+ Validation
      let error = "";
      setErrorInput((prev) => "");

      //- Check Title
      if (!isNotEmpty(commentInput)) error = "Comment is required";
      if (comment.length > 2000) error = "Comment character length is more over 2000!";

      setErrorInput(error);
      const isError = error;

      if (!isError) {
        await dispatch(thunk_updateComment({ blogId, commentId: comment.id, title }));
        setIsEditing(false);
        toast.success("Update completed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  function handleOnClickCancelDelete() {
    setIsDeleting(false);
  }

  async function handleOnClickConfirmDelete() {
    try {
      await dispatch(thunk_deleteComment({ blogId, commentId: comment.id }));
      toast.success("Delete completed");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="blog-comment-card-group">
      <div className="header-group">
        <ProfileTitle
          profileImage={comment.profileImage}
          name={comment.profileName}
          since={date}
          to={`/profile/${comment.profileId}`}
        />

        {comment.profileId === myUser?.id ? (
          isEditing ? (
            <Button name="Save" onClick={handleOnClickSaveEditButton} />
          ) : (
            <div ref={dropdownEl}>
              <IconText type="vertical-dot" onClick={toggleDropdown} />
              <ul className={`comment-edit-dropdown-content ${dropdown ? "d-flex" : "d-none"}`}>
                <OptionDropdown title="Edit" onClick={handleOnClickEditButton}>
                  <i class="fa-solid fa-pen"></i>
                </OptionDropdown>
                <OptionDropdown title="Delete" onClick={handleOnClickDeleteButton}>
                  <i class="fa-solid fa-trash"></i>
                </OptionDropdown>
              </ul>
            </div>
          )
        ) : (
          ""
        )}
      </div>

      <form className={`comment-input-form ${isEditing ? "d-flex" : "d-none"}`}>
        <Textarea
          placeholder="write your comment"
          value={commentInput}
          errorText={errorInput}
          onChange={handleOnChangeCommentInput}
          onKeyUp={handleKeyUpCancelEdit}
          ref={commentInputEl}
          maxLength={2000}
        />
        <div className="small-group">
          <small>
            Please ESC or click <span onClick={handleOnClickCancelEditSpan}>cancel</span>
          </small>
        </div>
      </form>

      <div
        className={`comment-text ${isEditing ? "d-none" : "d-block"}`}
        ref={commentEl}
        dangerouslySetInnerHTML={{ __html: JSON.parse(comment.contentText).replace(/\n/g, "<br>") }}
      ></div>

      <IconText
        type="like"
        name={`${comment.commentLikeCount} Likes`}
        onClick={handleOnClickCommentLike}
        isActive={comment.isCommentLike}
        unauthorized={!Boolean(myUser)}
      />
      {isDeleting ? (
        <div className="delete-button-group">
          <Button name="Delete" className="btn-delete" onClick={handleOnClickConfirmDelete} />
          <Button name="Cancel" className="btn-cancel" onClick={handleOnClickCancelDelete} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BlogCommentCard;
