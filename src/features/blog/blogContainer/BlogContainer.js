import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditorState, convertToRaw } from "draft-js";
import { toast } from "react-toastify";
import draftToHtml from "draftjs-to-html";
import millify from "millify";

import {
  selectBlog,
  selectComments,
  thunk_getBlogById,
  thunk_toggleSave,
  thunk_toggleLike,
  thunk_createComment,
  thunk_updateBlog,
  thunk_deleteBlog
} from "../../../stores/blogSlice";
import { selectMe } from "../../../stores/myUserSlice";

import Button from "../../../components/button/Button";
import IconText from "../../../components/iconText/IconText";
import Modal from "../../../components/modal/Modal";
import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import SelectBox from "../../../components/selectBox/SelectBox";
import ShareSocial from "../../../components/shareSocial/ShareSocial";
import SidebarBlog from "./SidebarBlog";
import BlogCommentCard from "../blogCommentCard/BlogCommentCard";
import BlogEditDropdown from "./BlogEditDropdown";
import DraftEditor from "../createBlogContainer/DraftEditor";

import { commentSortItem } from "../../../constants/constant";
import { useUploadBlogImage } from "../../../hooks/useUploadBlogImage";
import * as customValidator from "../../../validation/validation";

function BlogContainer() {
  const [modalCommentIsOpen, setModalCommentIsOpen] = useState(false);
  const [modalProfileIsOpen, setModalProfileIsOpen] = useState(false);

  const [commentInput, setCommentInput] = useState("");
  const [errorCommentInput, setErrorCommentInput] = useState("");
  const [sortComment, setSortComment] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [title, setTitle] = useState("");

  const initialError = { title: "", editor: "" };
  const [errorInput, setErrorInput] = useState({ ...initialError });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogId } = useParams();

  const myUser = useSelector(selectMe);
  const blog = useSelector(selectBlog);
  const commentList = useSelector((state) => selectComments(state, sortComment));

  const textareaEl = useRef(null);

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

  function openModalComment() {
    setModalCommentIsOpen(true);
  }
  function closeModalComment() {
    setErrorCommentInput("");
    setModalCommentIsOpen(false);
  }

  function openModalProfile() {
    setModalProfileIsOpen(true);
  }
  function closeModalProfile() {
    setModalProfileIsOpen(false);
  }
  function onChangeTextarea(ev) {
    setCommentInput(() => ev.target.value);
  }

  function handleClickConfirmEditorCancel() {
    setIsEdit(false);
    setErrorInput({ ...initialError });
  }

  async function handleClickSaveBlog() {
    try {
      await dispatch(thunk_toggleSave(blogId));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClickLikeBlog() {
    try {
      await dispatch(thunk_toggleLike(blogId));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClickCreateComment(ev) {
    try {
      ev.preventDefault();

      //+ Validation
      let error = "";
      setErrorCommentInput((prev) => "");

      //- Check Title
      if (!customValidator.isNotEmpty(commentInput)) error = "Comment is required";
      if (commentInput.length > 2000) error = "Comment character length is more over 2000!";

      setErrorCommentInput(error);

      const isError = error;

      const title = JSON.stringify(commentInput.replace(/\n+/g, "\n"));

      if (!isError) {
        await dispatch(thunk_createComment({ blogId, title }));
        setCommentInput("");
        textareaEl.current.value = "";
        toast.success("Comment have succesful created");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }

  async function handleClickEditBlog() {
    try {
      setIsEdit(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClickDeleteBlog() {
    try {
      await dispatch(thunk_deleteBlog(blogId));
      toast.success("Delete completed");
      navigate("/blog");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  const uploadImageReplaceURL = useUploadBlogImage();

  async function handleClickPublish() {
    try {
      const contentState = editorState.getCurrentContent();
      //+ Validation
      const error = initialError;
      setErrorInput((prev) => ({ ...initialError }));

      //- Check Title
      if (!customValidator.isNotEmpty(title)) error.title = "Title is required";

      //- Check Editor
      const plainText = contentState.getPlainText();
      if (!customValidator.isNotEmpty(plainText)) error.editor = "Content in Editor is required";

      setErrorInput((prev) => ({ ...error }));

      const isError = error.editor || error.title;

      if (!isError) {
        const featureImage = await uploadImageReplaceURL(contentState);
        const rawContentState = convertToRaw(contentState);
        const inputData = { title, rawContentState, featureImage, blogId };
        await dispatch(thunk_updateBlog(inputData));
        setIsEdit(false);
        toast.success("Blog post have succesful updated");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  return (
    <div className="blog-container col-10">
      <div className="header-background-blog-container"></div>

      {isEdit ? (
        <DraftEditor
          initialTitle={blog.blogTitle}
          initialRawContent={blog.blogRawContent}
          editorState={editorState}
          setEditorState={setEditorState}
          title={title}
          setTitle={setTitle}
          errorInput={errorInput}
          handlePublishButton={handleClickPublish}
          handleConfirmCancel={handleClickConfirmEditorCancel}
        />
      ) : (
        <>
          <div className="main-group">
            <div className="header-group">
              <ProfileTitle profileImage={blog.profileImage} name={blog.profileName} about={blog.blogDate} />
              <div className="action-group">
                <ShareSocial />
                {myUser ? <IconText type="save-post" isActive={blog.isSave} onClick={handleClickSaveBlog} /> : ""}
                {blog.profileId === myUser?.id ? (
                  <BlogEditDropdown onClickEdit={handleClickEditBlog} onClickDelete={handleClickDeleteBlog} />
                ) : (
                  ""
                )}
                <IconText type="outdent" onClick={openModalProfile} />
              </div>
            </div>

            <div className="blog-content-group">
              <div className="title">{blog.blogTitle}</div>
              <div className="content" dangerouslySetInnerHTML={{ __html: draftToHtml(blog.blogRawContent) }}></div>
              <div className="foot-action">
                <IconText
                  type="like"
                  name={`${millify(blog.blogLikeCount)} Likes`}
                  isActive={blog.isLike}
                  onClick={handleClickLikeBlog}
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

          <SidebarBlog
            profile_name={blog.profileName}
            profile_image={blog.profileImage}
            profile_about={blog.profileAbout}
          />

          <Modal header="" isOpen={modalProfileIsOpen} closeModal={closeModalProfile} className="modal-sidebar">
            <SidebarBlog
              profile_name={blog.profileName}
              profile_image={blog.profileImage}
              profile_about={blog.profileAbout}
            />
          </Modal>

          <Modal header="Comments" isOpen={modalCommentIsOpen} closeModal={closeModalComment} className="modal-comment">
            {myUser ? (
              <form className="comment-form" onSubmit={handleClickCreateComment}>
                <textarea
                  className={`textarea ${errorCommentInput ? "input-error" : ""}`}
                  placeholder="Write your comment"
                  onChange={onChangeTextarea}
                  ref={textareaEl}
                  value={commentInput}
                ></textarea>
                <div className="small-text">
                  <small className="textarea-count"> {commentInput.length}/2000 Characters</small>
                  {errorCommentInput ? <small className="text-error">{errorCommentInput}</small> : ""}
                </div>
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
        </>
      )}
    </div>
  );
}

export default BlogContainer;
