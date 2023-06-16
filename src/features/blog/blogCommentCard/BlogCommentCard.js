import { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import IconText from "../../../components/iconText/IconText";
import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import OptionDropdown from "../../../components/optionDropdown/OptionDropdown";
import Modal from "../../../components/modal/Modal";
import Confirm from "../../../components/confirm/Confirm";
import Button from "../../../components/button/Button";

import { thunk_commentToggleLike, thunk_deleteComment, thunk_updateComment } from "../../../stores/blogSlice";
import { selectMe } from "../../../stores/myUserSlice";

import { timeSince } from "../../../utilities/dateFormat";
import { useClickOutSide } from "../../../hooks/useClickOutside";
import * as customValidator from "../../../validation/validation";

function BlogCommentCard(props) {
  const { comment } = props;

  const params = useParams();
  const dispatch = useDispatch();

  const [dropdown, setDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

  const dropdownEl = useClickOutSide(useCallback(closeDropdown, []));
  const commentInputEl = useRef(null);
  const commentEl = useRef(null);

  const myUser = useSelector(selectMe);

  const { blogId } = params;
  const commentId = comment.id;
  const commentUserId = comment.userId;
  const commentJSON = comment.contentText;
  const commentLikeCount = comment.CommentLikes.length;
  const isCommentLike = comment.CommentLikes.filter((item) => item.userId === myUser?.id).length;
  const date = timeSince(comment.createdAt);
  const profileName = `${comment.User.firstName} ${comment.User.lastName}`;
  const profileImage = comment.User.profileImage;

  useEffect(() => {
    setCommentInput(JSON.parse(commentJSON));
  }, [commentJSON]);

  function closeDropdown() {
    setDropdown(false);
  }
  function toggleDropdown() {
    setDropdown((previous) => !previous);
  }

  function openModalDelete() {
    setModalDeleteIsOpen(true);
  }
  function closeModalDelete() {
    setModalDeleteIsOpen(false);
  }

  function onChangeCommentInput(ev) {
    setCommentInput(ev.target.value);
  }

  async function handleClickCommentLike() {
    try {
      await dispatch(thunk_commentToggleLike(commentId));
    } catch (error) {
      console.log(error);
    }
  }

  function handleClickEditButton() {
    commentInputEl.current.style.height = commentEl.current.scrollHeight + 10 + "px";
    setIsEditing(true);
    closeDropdown();
  }

  function handleClickDeleteButton() {
    openModalDelete();
    closeDropdown();
  }

  function handleClickCancelEditSpan() {
    setIsEditing(false);
    setCommentInput(JSON.parse(commentJSON));
    setErrorInput("");
  }

  function handleKeyUpCancelEdit(ev) {
    if (ev.keyCode === 27) {
      handleClickCancelEditSpan();
    }
  }

  async function handleClickSaveEditButton(ev) {
    try {
      ev.preventDefault();
      const title = JSON.stringify(commentInput.replace(/\n+/g, "\n"));

      //+ Validation
      let error = "";
      setErrorInput((prev) => "");

      //- Check Title
      if (!customValidator.isNotEmpty(commentInput)) error = "Comment is required";
      if (comment.length > 2000) error = "Comment character length is more over 2000!";

      setErrorInput(error);
      const isError = error;

      if (!isError) {
        await dispatch(thunk_updateComment({ blogId, commentId: commentId, title }));
        setIsEditing(false);
        toast.success("Update completed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  async function handleClickConfirmDelete() {
    try {
      await dispatch(thunk_deleteComment({ blogId, commentId: commentId }));
      toast.success("Delete completed");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      closeModalDelete();
    }
  }

  return (
    <div className="blog-comment-card-group">
      <div className="header-group">
        <ProfileTitle profileImage={profileImage} name={profileName} since={date} />

        {commentUserId === myUser?.id ? (
          isEditing ? (
            <Button name="Save" onClick={handleClickSaveEditButton} />
          ) : (
            <div ref={dropdownEl}>
              <IconText type="vertical-dot" onClick={toggleDropdown} />
              <ul className={`comment-edit-dropdown-content ${dropdown ? "d-flex" : "d-none"}`}>
                <OptionDropdown title="Edit" onClick={handleClickEditButton}>
                  <i class="fa-solid fa-pen"></i>
                </OptionDropdown>
                <OptionDropdown title="Delete" onClick={handleClickDeleteButton}>
                  <i class="fa-solid fa-trash"></i>
                </OptionDropdown>
              </ul>
            </div>
          )
        ) : (
          ""
        )}
      </div>

      <Modal header="Delete Confirmation" isOpen={modalDeleteIsOpen} closeModal={closeModalDelete}>
        <Confirm
          onConfirm={handleClickConfirmDelete}
          onCancel={closeModalDelete}
          text="Are you sure, you want to delete the blog ?"
        />
      </Modal>

      <form className={`comment-input-form ${isEditing ? "d-flex" : "d-none"}`}>
        <small className="textarea-count">{commentInput.length}/2000 Characters</small>
        <textarea
          className={`textarea ${errorInput ? "input-error" : ""}`}
          value={commentInput}
          onChange={onChangeCommentInput}
          onKeyUp={handleKeyUpCancelEdit}
          ref={commentInputEl}
        ></textarea>
        <div className="small-group">
          <small>
            Please ESC or click <span onClick={handleClickCancelEditSpan}>cancel</span>
          </small>
          {errorInput ? <small className="text-error">{errorInput}</small> : ""}
        </div>
      </form>

      <div
        className={`comment ${isEditing ? "d-none" : "d-block"}`}
        ref={commentEl}
        dangerouslySetInnerHTML={{ __html: JSON.parse(commentJSON).replace(/\n/g, "<br>") }}
      ></div>
      <IconText
        type="like"
        name={`${commentLikeCount} Likes`}
        onClick={handleClickCommentLike}
        isActive={isCommentLike}
        unauthorized={!Boolean(myUser)}
      />
    </div>
  );
}

export default BlogCommentCard;
