// import "./forgotPasswordForm.css";

import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

function ForgotPasswordForm() {
  return (
    <form className="forgot-password-auth-form">
      <div className="input-group">
        <span className="title">Enter your email address</span>
        <InputText placeholder="Enter email address" />
      </div>
      <div className="button-group">
        <Button name="Confirm" type="submit" />
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
