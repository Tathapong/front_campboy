import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import * as customValidator from "../../../validation/validation";
import { thunk_changePassword } from "../../../stores/myUserSlice";
import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

function ChangePasswordForm(props) {
  const dispatch = useDispatch();
  const inputEl = useRef([]);

  const { closeModal } = props;

  const initialValue = { oldPassword: "", newPassword: "", confirmPassword: "" };
  const [inputValue, setInputValue] = useState({ ...initialValue });
  const [errorInput, setErrorInput] = useState({ ...initialValue });

  const onChangeOldPassword = (ev) => setInputValue((prev) => ({ ...prev, oldPassword: ev.target.value }));
  const onChangeNewPassword = (ev) => setInputValue((prev) => ({ ...prev, newPassword: ev.target.value }));
  const onChangeConfirmPassword = (ev) => setInputValue((prev) => ({ ...prev, confirmPassword: ev.target.value }));

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      //+ Validation
      const error = { ...initialValue };
      setErrorInput((prev) => ({ ...initialValue })); ///+ Reset error

      //- Check Old password
      if (!customValidator.isNotEmpty(inputValue.oldPassword)) error.oldPassword = "Old password is required";

      //- Check New password
      if (!customValidator.isNotEmpty(inputValue.newPassword)) error.newPassword = "New password is required";
      else if (!customValidator.isStrongPassword(inputValue.newPassword))
        error.newPassword =
          "New password must be strong (min length : 8, min lowercase :1, min uppercase : 1, min numbers : 1, min symbols : 1)";

      //- Check Confirm password
      if (!customValidator.isNotEmpty(inputValue.confirmPassword))
        error.confirmPassword = "Confirm password is required";
      else if (inputValue.confirmPassword !== inputValue.newPassword)
        error.confirmPassword = "Confirm password and new password did not match";

      setErrorInput((prev) => ({ ...error })); ///+ Set error

      const isError = error.oldPassword || error.newPassword || error.confirmPassword;

      if (!isError) {
        const input = {
          oldPassword: inputValue.oldPassword,
          newPassword: inputValue.newPassword,
          confirmPassword: inputValue.confirmPassword
        };
        await dispatch(thunk_changePassword(input));
        inputEl.current.map((item) => (item.value = ""));

        setInputValue({ ...initialValue });
        closeModal();
        toast.success("password have changed");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <form className="change-password-auth-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <InputText
          type="password"
          placeholder="Old password"
          onChange={onChangeOldPassword}
          ref={(el) => (inputEl.current[0] = el)}
          errorText={errorInput.oldPassword}
        />

        <InputText
          type="password"
          placeholder="New password"
          onChange={onChangeNewPassword}
          ref={(el) => (inputEl.current[1] = el)}
          errorText={errorInput.newPassword}
        />

        <InputText
          type="password"
          placeholder="Confirm new password"
          onChange={onChangeConfirmPassword}
          ref={(el) => (inputEl.current[2] = el)}
          errorText={errorInput.confirmPassword}
        />
      </div>
      <div className="button-group">
        <Button name="Confirm" type="submit" />
        <Button name="Cancel" onClick={closeModal} />
      </div>
    </form>
  );
}

export default ChangePasswordForm;
