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
      about: profile.about,
      profileFile: null,
      coverFile: null
    }));
    setErrorInput((prev) => ({ ...initialError }));

    profileImageEl.current.value = null;
    coverImageEl.current.value = null;
  }, [profile, modalIsOpen]);

  function handleOnChangeFirstNameInput(ev) {
    setInputValue((prev) => ({ ...prev, firstName: ev.target.value }));
  }

  function handleOnChangeLastNameInput(ev) {
    setInputValue((prev) => ({ ...prev, lastName: ev.target.value }));
  }

  function handleOnChangeAboutInput(ev) {
    setInputValue((prev) => ({ ...prev, about: ev.target.value }));
  }

  function handleOnChangeProfileImageFile(ev) {
    if (ev.target.files[0]) setInputValue((prev) => ({ ...prev, profileFile: ev.target.files[0] }));
  }

  function handleOnChangeCoverImageFile(ev) {
    if (ev.target.files[0]) setInputValue((prev) => ({ ...prev, coverFile: ev.target.files[0] }));
  }

  function handleOnClickUploadProfileImage() {
    profileImageEl.current.click();
  }

  function handleOnClickUploadCoverImage() {
    coverImageEl.current.click();
  }

  function handleOnClickCancel() {
    closeModal();
  }

  async function handleOnClickConfirm() {
    try {
      //+ Validation
      const error = { ...initialValue };
      setErrorInput((prev) => ({ ...initialError }));

      //- First name
      if (!isNotEmpty(inputValue.firstName)) error.firstName = "First name is required";

      //- Last name
      if (!isNotEmpty(inputValue.lastName)) error.lastName = "Last name is required";

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
        <IconText type={`camera`} onClick={handleOnClickUploadProfileImage} />
        <input
          type="file"
          className="d-none"
          onChange={handleOnChangeProfileImageFile}
          ref={profileImageEl}
          accept="image/*"
        />
      </div>

      <div className="title">Cover image</div>

      <div className="cover-image-group">
        <img
          src={inputValue.coverFile ? URL.createObjectURL(inputValue.coverFile) : profile.coverImage}
          className="cover-image"
          alt="cover"
        />
        <IconText type={`camera`} onClick={handleOnClickUploadCoverImage} />
        <input
          type="file"
          className="d-none"
          onChange={handleOnChangeCoverImageFile}
          ref={coverImageEl}
          accept="image/*"
        />
      </div>

      <form className="form-group">
        <div className="firstname-input-group">
          <div className="input-label">First name</div>
          <InputText
            placeholder="Enter frst name"
            value={inputValue.firstName}
            onChange={handleOnChangeFirstNameInput}
            errorText={errorInput.firstName}
            maxLength={50}
          />
        </div>

        <div className="lastname-input-group">
          <div className="input-label">Last name</div>
          <InputText
            placeholder="Enter last name"
            value={inputValue.lastName}
            onChange={handleOnChangeLastNameInput}
            errorText={errorInput.lastName}
            maxLength={50}
          />
        </div>

        <div className="about-input-group">
          <div className="input-label">About</div>
          <Textarea
            placeholder="Enter about"
            value={inputValue.about}
            onChange={handleOnChangeAboutInput}
            ref={textareaEl}
            maxLength={160}
          />
        </div>
        <div className="button-group">
          <Button name="Confirm" onClick={handleOnClickConfirm} />
          <Button name="Cancel" onClick={handleOnClickCancel} />
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
