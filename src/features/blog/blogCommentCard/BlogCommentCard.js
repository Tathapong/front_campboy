import { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import IconText from "../../../components/iconText/IconText";
import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import OptionDropdown from "../../../components/optionDropdown/OptionDropdown";
import Modal from "../../../components/modal/Modal";
import Confirm from "../../../components/confirm/Confirm";

import { thunk_commentToggleLike, thunk_deleteComment, thunk_updateComment } from "../../../stores/blogSlice";
import { selectMe } from "../../../stores/myUserSlice";

import { timeSince } from "../../../utilities/dateFormat";
import { useClickOutSide } from "../../../hooks/useClickOutside";
import Button from "../../../components/button/Button";

function BlogCommentCard(props) {
  const { comment } = props;

  const params = useParams();
  const dispatch = useDispatch();

  const [dropdown, setDropdown] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

  const closeDropdown = () => setDropdown(false);
  const toggleDropdown = () => setDropdown((previous) => !previous);

  const openModalDelete = () => setModalDeleteIsOpen(true);
  const closeModalDelete = () => setModalDeleteIsOpen(false);

  const dropdownEl = useClickOutSide(useCallback(closeDropdown, []));
  const commentInputEl = useRef(null);
  const commentEl = useRef(null);

  const myUser = useSelector(selectMe);

  const { blogId } = params;
  const comment_id = comment.id;
  const commentUserId = comment.userId;
  const date = timeSince(comment.createdAt);
  const profile_name = `${comment.User.firstName} ${comment.User.lastName}`;
  const profile_image = comment.User.profileImage;
  const text = comment.contentText;
  const comment_like_count = comment.CommentLikes.length;
  const is_comment_like = comment.CommentLikes.filter((item) => item.userId === myUser?.id).length;

  useEffect(() => {
    setCommentInput(text);
  }, [text]);

  const handleCommentLike = async () => {
    try {
      await dispatch(thunk_commentToggleLike(comment_id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickEditButton = () => {
    commentInputEl.current.style.height = commentEl.current.scrollHeight + 10 + "px";
    setIsEditing(true);
    closeDropdown();
  };

  const handleClickDeleteButton = () => {
    openModalDelete();
    closeDropdown();
  };

  const handleClickCancelEditSpan = () => {
    setIsEditing(false);
    setCommentInput(text);
  };

  const handleKeyUpCancelEdit = (ev) => {
    if (ev.keyCode === 27) {
      handleClickCancelEditSpan();
    }
  };

  const handleClickSaveEditButton = async () => {
    try {
      await dispatch(thunk_updateComment({ blogId, commentId: comment_id, title: commentInput }));
      setIsEditing(false);
      toast.success("Update completed");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleClickConfirmDelete = async () => {
    try {
      await dispatch(thunk_deleteComment({ blogId, commentId: comment_id }));
      toast.success("Delete completed");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      closeModalDelete();
    }
  };

  const onChangeCommentInput = (ev) => setCommentInput(ev.target.value);

  return (
    <div className="blog-comment-card-group">
      <div className="header-group">
        <ProfileTitle profileImage={profile_image} name={profile_name} since={date} />

        {commentUserId === myUser?.id ? (
          isEditing ? (
            <Button name="Save" onClick={handleClickSaveEditButton} />
          ) : (
            <div>
              <IconText type="vertical-dot" onClick={toggleDropdown} />
              <ul className={`comment-edit-dropdown-content ${dropdown ? "d-flex" : "d-none"}`} ref={dropdownEl}>
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
        <textarea
          value={commentInput}
          onChange={onChangeCommentInput}
          onKeyUp={handleKeyUpCancelEdit}
          ref={commentInputEl}
        ></textarea>
        <small>
          Please ESC or click <span onClick={handleClickCancelEditSpan}>cancel</span>
        </small>
      </form>

      <div className={`comment ${isEditing ? "d-none" : "d-block"}`} ref={commentEl}>
        {text}
      </div>
      <IconText
        type="like"
        name={`${comment_like_count} Likes`}
        onClick={handleCommentLike}
        isActive={is_comment_like}
        unauthorized={!Boolean(myUser)}
      />
    </div>
  );
}

export default BlogCommentCard;
