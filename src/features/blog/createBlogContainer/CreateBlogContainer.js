import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EditorState, convertToRaw } from "draft-js";

import DraftEditor from "./DraftEditor";

import { thunk_createBlog } from "../../../stores/blogSlice";
import * as customValidator from "../../../validation/validation";
import { useUploadBlogImage } from "../../../hooks/useUploadBlogImage";

function CreateBlog() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [title, setTitle] = useState("");

  const initialError = { title: "", editor: "" };
  const [errorInput, setErrorInput] = useState({ ...initialError });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadImageReplaceURL = useUploadBlogImage();

  function handleClickConfirmEditorCancel() {
    navigate("/blog");
  }

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
        const inputData = { title, rawContentState, featureImage };
        await dispatch(thunk_createBlog(inputData));
        navigate("/blog");
        toast.success("Blog post have successful created");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }

  return (
    <div className="create-blog-container col-10">
      <div className="header-background-create-blog"></div>
      <DraftEditor
        editorState={editorState}
        setEditorState={setEditorState}
        title={title}
        setTitle={setTitle}
        errorInput={errorInput}
        handlePublishButton={handleClickPublish}
        handleConfirmCancel={handleClickConfirmEditorCancel}
      />
    </div>
  );
}

export default CreateBlog;
