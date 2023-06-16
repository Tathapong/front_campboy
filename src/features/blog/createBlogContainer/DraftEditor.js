import { useState, useEffect, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import InputText from "../../../components/inputText/InputText";
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import Confirm from "../../../components/confirm/Confirm";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function DraftEditor(props) {
  const {
    initialTitle,
    initialRawContent,
    editorState,
    setEditorState,
    title,
    setTitle,
    errorInput,
    handlePublishButton,
    handleConfirmCancel
  } = props;

  const [modalPreviewIsOpen, setModalPreviewIsOpen] = useState(false);
  const [modalConfirmCancel, setModalConfirmCancel] = useState(false);

  const titleInputEl = useRef(null);

  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle);
      titleInputEl.current.value = initialTitle;
    }

    if (initialRawContent) {
      const newEditorState = EditorState.createWithContent(convertFromRaw(initialRawContent));
      setEditorState(() => newEditorState);
    }
  }, [initialTitle, initialRawContent, setEditorState, setTitle]);

  function onChangeTitle(ev) {
    setTitle(() => ev.target.value);
  }
  function onEditorStateChange(newContent) {
    setEditorState(newContent);
  }

  function openModalPreview() {
    setModalPreviewIsOpen(true);
  }

  function closeModalPreview() {
    setModalPreviewIsOpen(false);
  }

  function openModalConfirmCancel() {
    setModalConfirmCancel(true);
  }

  function closeModalConfirmCancel() {
    setModalConfirmCancel(false);
  }

  function handleClickPreviewButton() {
    openModalPreview();
  }

  function handleClickCancelButton() {
    openModalConfirmCancel();
  }

  async function uploadCallback(file) {
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        setTimeout(() => {
          reader.onload = () => {
            resolve({ data: { link: reader.result } });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        }, 500);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="draft-editor-group">
      <div className="title-group">
        <h4>Title</h4>
        <InputText ref={titleInputEl} placeholder="Title" onChange={onChangeTitle} errorText={errorInput.title} />
      </div>

      <div className="content-group">
        <h4>Content</h4>
        <Editor
          wrapperStyle={errorInput.editor ? { border: "2px solid red" } : {}}
          wrapperClassName="wrapper"
          editorClassName="editor"
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          placeholder="Tell your story..."
          handlePastedText={() => false}
          toolbar={{
            image: {
              uploadCallback: uploadCallback,
              alignmentEnabled: false,
              previewImage: true,
              alt: { present: true, mandatory: false },
              defaultSize: {
                height: "auto",
                width: "100%"
              }
            }
          }}
        />
      </div>

      <div className="button-group">
        <Button name="Preview" onClick={handleClickPreviewButton} />
        <Button name="Publish" onClick={handlePublishButton} />
        <Button name="Cancel" className="btn-cancel" onClick={handleClickCancelButton} />
      </div>

      <Modal header={title ? title : "<Title>"} isOpen={modalPreviewIsOpen} closeModal={closeModalPreview}>
        <div
          dangerouslySetInnerHTML={{
            __html: draftToHtml(convertToRaw(editorState.getCurrentContent()))
          }}
        ></div>
      </Modal>
      <Modal header="Confirm Cancel" isOpen={modalConfirmCancel} closeModal={closeModalConfirmCancel}>
        <Confirm onCancel={closeModalConfirmCancel} onConfirm={handleConfirmCancel} />
      </Modal>
    </div>
  );
}

export default DraftEditor;
