import React from "react";
import { Link } from "react-router-dom";

import avatar from "../../../assets/images/avatar1.jpg";
import coverImage from "../../../assets/images/camp1.jpg";
import InputText from "../../../components/inputText/InputText";
import Button from "../../../components/button/Button";

function EditProfileForm() {
  return (
    <div className="edit-profile-form">
      <div className="title">Profile image</div>

      <Link className="profile-image-group">
        <img src={avatar} className="profile-image" alt="profile" />
      </Link>
      <div className="title">Cover image</div>
      <Link className="cover-image-group">
        <img src={coverImage} className="cover-image" alt="cover" />
      </Link>
      <div className="title">Profile</div>

      <form className="form-group">
        <div className="name-input-group">
          <div className="input-label">Name</div>
          <InputText placeholder="Enter name" />
        </div>

        <div className="about-input-group">
          <div className="input-label">About</div>
          <textarea className="textarea" placeholder="Enter about" />
        </div>
        <div className="button-group">
          <Button name="Confirm" />
          <Button name="Cancel" />
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
