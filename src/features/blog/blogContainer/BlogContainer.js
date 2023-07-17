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
import Textarea from "../../../components/textarea/Textarea";
import SidebarBlog from "./SidebarBlog";
import BlogCommentCard from "../blogCommentCard/BlogCommentCard";
import DraftEditor from "../createBlogContainer/DraftEditor";

import { commentSortItem } from "../../../constants/constant";
import { useUploadBlogImage } from "../../../hooks/useUploadBlogImage";
import { isNotEmpty } from "../../../validation/validation";
import EditDropdown from "../../../components/editDropdown/EditDropdown";

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
  const [errorEditor, setErrorEditor] = useState({ ...initialError });

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
        if (error.response.status === 404) navigate("/*");
      }
    };
    fetch();
    closeModalProfile();
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

  function handleOnClickEditBlog() {
    setIsEdit(true);
  }

  function handleOnChangeTextarea(ev) {
    setCommentInput(() => ev.target.value);
  }

  const uploadImageReplaceURL = useUploadBlogImage();
  async function handleOnClickPublish() {
    try {
      const contentState = editorState.getCurrentContent();
      //+ Validation
      const error = initialError;
      setErrorEditor((prev) => ({ ...initialError }));

      //- Check Title
      if (!isNotEmpty(title)) error.title = "Title is required";

      //- Check Editor
      const plainText = contentState.getPlainText();
      if (!isNotEmpty(plainText)) error.editor = "Content in Editor is required";

      setErrorEditor((prev) => ({ ...error }));

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

  function handleOnClickConfirmEditorCancel() {
    setIsEdit(false);
    setErrorEditor({ ...initialError });
  }

  async function handleOnClickDeleteBlog() {
    try {
      await dispatch(thunk_deleteBlog(blogId));
      toast.success("Delete completed");
      navigate("/blog");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  async function handleOnClickSaveBlog() {
    try {
      await dispatch(thunk_toggleSave(blogId));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleOnClickLikeBlog() {
    try {
      await dispatch(thunk_toggleLike(blogId));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleOnClickCreateComment(ev) {
    try {
      ev.preventDefault();

      //+ Validation
      let error = "";
      setErrorCommentInput((prev) => "");

      //- Check Title
      if (!isNotEmpty(commentInput)) error = "Comment is required";
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

  return (
    <div className="blog-container col-10">
      <div className="header-background-blog-container"></div>

      {isEdit ? (
        <DraftEditor
          initialTitle={blog.title}
          initialRawContent={blog.content ? JSON.parse(blog.content) : ""}
          editorState={editorState}
          setEditorState={setEditorState}
          title={title}
          setTitle={setTitle}
          errorInput={errorEditor}
          handlePublishButton={handleOnClickPublish}
          handleConfirmCancel={handleOnClickConfirmEditorCancel}
        />
      ) : (
        <>
          <div className="main-group">
            <div className="header-group">
              <ProfileTitle
                profileImage={blog.profileImage}
                name={blog.profileName}
                about={blog.createdAt ? new Date(blog.createdAt).toDateString().slice(4) : ""}
                to={`/profile/${blog.profileId}`}
              />
              <div className="action-group">
                <ShareSocial />
                {myUser ? <IconText type="save-post" isActive={blog.isSave} onClick={handleOnClickSaveBlog} /> : ""}
                {blog.profileId === myUser?.id ? (
                  <EditDropdown onClickEdit={handleOnClickEditBlog} onClickDelete={handleOnClickDeleteBlog} />
                ) : (
                  ""
                )}
                <IconText type="outdent" onClick={openModalProfile} />
              </div>
            </div>

            <div className="blog-content-group">
              <div className="title">{blog.title}</div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: blog.content ? draftToHtml(JSON.parse(blog.content)) : "" }}
              ></div>
              <div className="foot-action">
                <IconText
                  type="like"
                  name={`${blog.blogLikeCount ? millify(blog.blogLikeCount) : ""} Likes`}
                  isActive={Boolean(blog.isLike)}
                  onClick={handleOnClickLikeBlog}
                  unauthorized={!Boolean(myUser)}
                />
                <IconText
                  type="comment"
                  name={`${blog.blogCommentCount ? millify(blog.blogCommentCount) : ""} Comments`}
                  onClick={openModalComment}
                  isActive={modalCommentIsOpen}
                />
              </div>
            </div>
          </div>

          <SidebarBlog
            profileId={blog.profileId}
            profileName={blog.profileName}
            profileImage={blog.profileImage}
            profileAbout={blog.profileAbout}
            blogList={blog.moreBlog}
          />

          <Modal header="" isOpen={modalProfileIsOpen} closeModal={closeModalProfile} className="modal-sidebar">
            <SidebarBlog
              profileId={blog.profileId}
              profileName={blog.profileName}
              profileImage={blog.profileImage}
              profileAbout={blog.profileAbout}
              blogList={blog.moreBlog}
            />
          </Modal>

          <Modal header="Comments" isOpen={modalCommentIsOpen} closeModal={closeModalComment} className="modal-comment">
            {myUser ? (
              <form className="comment-form" onSubmit={handleOnClickCreateComment}>
                <Textarea
                  placeholder="Write your comment"
                  value={commentInput}
                  onChange={handleOnChangeTextarea}
                  errorText={errorCommentInput}
                  ref={textareaEl}
                  maxLength={2000}
                />
                <Button name="SEND" type="submit" />
              </form>
            ) : (
              ""
            )}
            {commentList.length ? (
              <>
                <SelectBox list={commentSortItem} setValue={setSortComment} selected={sortComment} />
                <div className="blog-comment-list">
                  {commentList.map((comment) => (
                    <BlogCommentCard key={comment.id} comment={comment} />
                  ))}
                </div>
              </>
            ) : (
              ""
            )}
          </Modal>
        </>
      )}
    </div>
  );
}

export default BlogContainer;
