import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { thunk_changePassword } from "../../../stores/myUserSlice";

import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";
import { toast } from "react-toastify";

function ChangePasswordForm(props) {
  const dispatch = useDispatch();

  const { closeModal } = props;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault();
      const data = { oldPassword, newPassword, confirmPassword };
      await dispatch(thunk_changePassword(data));
      toast.success("password have changed");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form className="change-password-auth-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <InputText type="password" placeholder="Old password" setValue={setOldPassword} />
        <InputText type="password" placeholder="New password" setValue={setNewPassword} />
        <InputText type="password" placeholder="Confirm new password" setValue={setConfirmPassword} />
      </div>
      <div className="button-group">
        <Button name="Confirm" type="submit" />
        <Button name="Cancel" onClick={closeModal} />
      </div>
    </form>
  );
}

export default ChangePasswordForm;
