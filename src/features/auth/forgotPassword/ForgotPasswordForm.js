import "./forgotPasswordForm.css";

import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

function ForgotPasswordForm() {
  return (
    <form className="forgotPassword-form">
      <span>Enter your email address</span>
      <InputText placeholder="Enter email address" />
      <Button name="Confirm" type="submit" />
    </form>
  );
}

export default ForgotPasswordForm;
