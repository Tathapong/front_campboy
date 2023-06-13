import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBlog,
  selectComments,
  thunk_getBlogById,
  thunk_toggleSave,
  thunk_toggleLike,
  thunk_createComment
} from "../../../stores/blogSlice";

import Modal from "../../../components/modal/Modal";
import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import ShareSocial from "../../../components/shareSocial/ShareSocial";
import IconText from "../../../components/iconText/IconText";
import BlogCommentCard from "../blogCommentCard/BlogCommentCard";
import SelectBox from "../../../components/selectBox/SelectBox";
import Sidebar from "./Sidebar";
import Button from "../../../components/button/Button";
import BlogEditDropdown from "./BlogEditDropdown";

import millify from "millify";
import { toast } from "react-toastify";

import { commentSortItem } from "../../../constants/constant";
import * as customValidator from "../../../validation/validation";
import { selectMe } from "../../../stores/myUserSlice";
import { thunk_deleteBlog } from "../../../stores/blogsSlice";
import DraftEditor from "../createBlogContainer/DraftEditor";

function BlogContainer() {
  const [modalCommentIsOpen, setModalCommentIsOpen] = useState(false);
  const [modalProfileIsOpen, setModalProfileIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);

  const [comment, setComment] = useState("");
  const [errorComment, setErrorComment] = useState("");
  const [sortComment, setSortComment] = useState("");

  const openModalComment = () => setModalCommentIsOpen(true);
  const closeModalComment = () => setModalCommentIsOpen(false);

  const openModalProfile = () => setModalProfileIsOpen(true);
  const closeModalProfile = () => setModalProfileIsOpen(false);

  const openModalEdit = () => setModalEditIsOpen(true);
  const closeModalEdit = () => setModalEditIsOpen(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogId } = useParams();

  const myUser = useSelector(selectMe);
  const blog = useSelector(selectBlog);
  const commentList = useSelector((state) => selectComments(state, sortComment));

  const textareaEl = useRef(null);

  const handleSaveBlog = async () => {
    try {
      await dispatch(thunk_toggleSave(blogId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeBlog = async () => {
    try {
      await dispatch(thunk_toggleLike(blogId));
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeTextarea = (ev) => setComment(ev.target.value);

  const handleCreateComment = async (ev) => {
    try {
      ev.preventDefault();

      //+ Validation
      let error = "";
      setErrorComment((prev) => "");

      //- Check Title
      if (!customValidator.isNotEmpty(comment)) error = "Comment is required";
      setErrorComment(error);

      const isError = error;

      if (!isError) {
        await dispatch(thunk_createComment({ blogId, title: comment }));
        setComment("");
        textareaEl.current.value = "";
        toast.success("Comment have succesful created");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const handleEditBlog = async () => {
    try {
      openModalEdit();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      await dispatch(thunk_deleteBlog(blogId));
      toast.success("Delete completed");
      navigate("/blog");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(thunk_getBlogById(blogId));
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [blogId, dispatch, myUser]);

  return (
    <div className="blog-container col-10">
      <div className="header-background-blog-container"></div>

      <div className="main-group">
        <div className="header-group">
          <ProfileTitle profileImage={blog.profileImage} name={blog.profileName} about={blog.blogDate} />
          <div className="action-group">
            <ShareSocial />
            {myUser ? <IconText type="save-post" isActive={blog.isSave} onClick={handleSaveBlog} /> : ""}
            {blog.profileId === myUser?.id ? (
              <BlogEditDropdown onClickEdit={handleEditBlog} onClickDelete={handleDeleteBlog} />
            ) : (
              ""
            )}
            <IconText type="outdent" onClick={openModalProfile} />
          </div>
        </div>

        <div className="blog-content-group">
          <div className="title">{blog.blogTitle}</div>
          <div className="content" dangerouslySetInnerHTML={{ __html: blog.blogContent }}></div>
          <div className="foot-action">
            <IconText
              type="like"
              name={`${millify(blog.blogLikeCount)} Likes`}
              isActive={blog.isLike}
              onClick={handleLikeBlog}
              unauthorized={!Boolean(myUser)}
            />
            <IconText
              type="comment"
              name={`${millify(blog.commentCount)} Comments`}
              onClick={openModalComment}
              isActive={modalCommentIsOpen}
            />
          </div>
        </div>
      </div>

      <Sidebar profile_name={blog.profileName} profile_image={blog.profileImage} profile_about={blog.profileAbout} />

      <Modal header="" isOpen={modalProfileIsOpen} closeModal={closeModalProfile} className="modal-sidebar">
        <Sidebar profile_name={blog.profileName} profile_image={blog.profileImage} profile_about={blog.profileAbout} />
      </Modal>

      <Modal header="Edit blog" isOpen={modalEditIsOpen} closeModal={closeModalEdit}>
        <DraftEditor initialTitle={blog.blogTitle} initialContent={blog.blogContent} />
      </Modal>

      <Modal header="Comments" isOpen={modalCommentIsOpen} closeModal={closeModalComment} className="modal-comment">
        {myUser ? (
          <form className="comment-form" onSubmit={handleCreateComment}>
            <textarea
              className={`textarea ${errorComment ? "input-error" : ""}`}
              placeholder="Write your comment"
              onChange={onChangeTextarea}
              ref={textareaEl}
            ></textarea>
            {errorComment ? <small className="text-error">{errorComment}</small> : ""}
            <Button name="SEND" type="submit" />
          </form>
        ) : (
          ""
        )}
        <SelectBox list={commentSortItem} setValue={setSortComment} selected={sortComment} />
        <div className="blog-comment-list">
          {commentList.length
            ? commentList.map((comment) => <BlogCommentCard key={comment.id} comment={comment} />)
            : []}
        </div>
      </Modal>
    </div>
  );
}

export default BlogContainer;
