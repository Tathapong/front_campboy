import "./forgotPassword.css";
import React from "react";
import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

function ForgotPassword() {
  return (
    <form className="forgotPassword-form">
      <span>Enter your email address</span>
      <InputText placeholder="Enter email address" />
      <Button name="Confirm" type="submit" />
    </form>
  );
}

export default ForgotPassword;
