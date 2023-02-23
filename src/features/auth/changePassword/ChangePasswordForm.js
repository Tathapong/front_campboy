import "./changePasswordForm.css";

import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

function ChangePasswordForm(props) {
  const { closeModal } = props;
  return (
    <form className="changePassword-form">
      <div className="input-group">
        <InputText placeholder="Old password" />
        <InputText placeholder="New password" />
        <InputText placeholder="Confirm new password" />
      </div>
      <div className="button-group">
        <Button name="Confirm" type="submit" />
        <Button name="Cancel" onClick={closeModal} />
      </div>
    </form>
  );
}

export default ChangePasswordForm;
