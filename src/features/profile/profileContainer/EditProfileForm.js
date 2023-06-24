import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Button from "../../../components/button/Button";
import IconText from "../../../components/iconText/IconText";
import InputText from "../../../components/inputText/InputText";
import Textarea from "../../../components/textarea/Textarea";

import { thunk_updateMyUser } from "../../../stores/myUserSlice";
import { isNotEmpty } from "../../../validation/validation";

function EditProfileForm(props) {
  const { profile, closeModal, modalIsOpen } = props;

  const initialValue = { firstName: "", lastName: "", about: "", profileFile: null, coverFile: null };
  const initialError = { firstName: "", lastName: "" };
  const [inputValue, setInputValue] = useState({ ...initialValue });
  const [errorInput, setErrorInput] = useState({ ...initialError });

  const profileImageEl = useRef(null);
  const coverImageEl = useRef(null);
  const textareaEl = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setInputValue((prev) => ({
      firstName: profile.firstName,
      lastName: profile.lastName,
      about: profile.profileAbout,
      profileFile: null,
      coverFile: null
    }));
    setErrorInput((prev) => ({ ...initialError }));

    textareaEl.current.value = profile.profileAbout;
    profileImageEl.current.value = null;
    coverImageEl.current.value = null;
  }, [profile, modalIsOpen]);

  function onChangeFirstNameInput(ev) {
    setInputValue((prev) => ({ ...prev, firstName: ev.target.value }));
  }

  function onChangeLastNameInput(ev) {
    setInputValue((prev) => ({ ...prev, lastName: ev.target.value }));
  }

  function onChangeAboutInput(ev) {
    setInputValue((prev) => ({ ...prev, about: ev.target.value }));
  }

  function onChangeProfileImageFile(ev) {
    if (ev.target.files[0]) setInputValue((prev) => ({ ...prev, profileFile: ev.target.files[0] }));
  }

  function onChangeCoverImageFile(ev) {
    if (ev.target.files[0]) setInputValue((prev) => ({ ...prev, coverFile: ev.target.files[0] }));
  }

  function onClickUploadProfileImage() {
    profileImageEl.current.click();
  }

  function onClickUploadCoverImage() {
    coverImageEl.current.click();
  }

  function onClickCancel() {
    closeModal();
  }

  async function onClickConfirm() {
    try {
      //+ Validation
      const error = { ...initialValue };
      setErrorInput((prev) => ({ ...initialError }));

      //- First name
      if (!isNotEmpty(inputValue.firstName)) error.firstName = "First name is required";

      //- Last name
      if (!isNotEmpty(inputValue.lastName)) error.lastName = "First name is required";

      setErrorInput((prev) => ({ ...error }));

      const isError = error.firstName || error.lastName;

      if (!isError) {
        const formData = new FormData();
        formData.append("firstName", inputValue.firstName);
        formData.append("lastName", inputValue.lastName);

        if (isNotEmpty(inputValue.about))
          formData.append("about", JSON.stringify(inputValue.about.replace(/\n+/g, "\n")));

        formData.append("profileImage", inputValue.profileFile);
        formData.append("coverImage", inputValue.coverFile);
        await dispatch(thunk_updateMyUser(formData));
        closeModal();
        toast.success("Profile have been updated");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }
  return (
    <div className="edit-profile-form">
      <div className="title">Profile image</div>

      <div className="profile-image-group">
        <img
          src={inputValue.profileFile ? URL.createObjectURL(inputValue.profileFile) : profile.profileImage}
          className="profile-image"
          alt="profile"
        />
        <IconText type={`camera`} onClick={onClickUploadProfileImage} />
        <input
          type="file"
          className="d-none"
          onChange={onChangeProfileImageFile}
          ref={profileImageEl}
          accept="image/*"
        />
      </div>

      <div className="title">Cover image</div>

      <div className="cover-image-group">
        <img
          src={inputValue.coverFile ? URL.createObjectURL(inputValue.coverFile) : profile.profileCoverImage}
          className="cover-image"
          alt="cover"
        />
        <IconText type={`camera`} onClick={onClickUploadCoverImage} />
        <input type="file" className="d-none" onChange={onChangeCoverImageFile} ref={coverImageEl} accept="image/*" />
      </div>
      <div className="title">Profile</div>

      <form className="form-group">
        <div className="firstname-input-group">
          <div className="input-label">First name</div>
          <InputText
            placeholder="Enter frst name"
            value={inputValue.firstName}
            onChange={onChangeFirstNameInput}
            errorText={errorInput.firstName}
            maxLength={50}
          />
        </div>

        <div className="lastname-input-group">
          <div className="input-label">Last name</div>
          <InputText
            placeholder="Enter last name"
            value={inputValue.lastName}
            onChange={onChangeLastNameInput}
            errorText={errorInput.lastName}
            maxLength={50}
          />
        </div>

        <div className="about-input-group">
          <div className="input-label">About</div>
          <Textarea
            placeholder="Enter about"
            value={inputValue.about}
            onChange={onChangeAboutInput}
            ref={textareaEl}
            maxLength={160}
          />
        </div>
        <div className="button-group">
          <Button name="Confirm" onClick={onClickConfirm} />
          <Button name="Cancel" onClick={onClickCancel} />
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
