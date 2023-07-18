import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

import { isNotEmpty, isStrongPassword } from "../../../validation/validation";
import { thunk_changePassword } from "../../../stores/myUserSlice";

function ChangePasswordForm(props) {
  const dispatch = useDispatch();
  const inputEl = useRef([]);

  const { closeModal } = props;

  const initialValue = { oldPassword: "", newPassword: "", confirmPassword: "" };
  const [inputValue, setInputValue] = useState({ ...initialValue });
  const [errorInput, setErrorInput] = useState({ ...initialValue });

  function handleOnChangeOldPassword(ev) {
    setInputValue((prev) => ({ ...prev, oldPassword: ev.target.value }));
  }
  function handleOnChangeNewPassword(ev) {
    setInputValue((prev) => ({ ...prev, newPassword: ev.target.value }));
  }
  function handleOnChangeConfirmPassword(ev) {
    setInputValue((prev) => ({ ...prev, confirmPassword: ev.target.value }));
  }

  async function handleOnSubmit(ev) {
    ev.preventDefault();

    try {
      //+ Validation
      const error = { ...initialValue };
      setErrorInput((prev) => ({ ...initialValue }));

      //- Check Old password
      if (!isNotEmpty(inputValue.oldPassword)) error.oldPassword = "Old password is required";

      //- Check New password
      if (!isNotEmpty(inputValue.newPassword)) error.newPassword = "New password is required";
      else if (!isStrongPassword(inputValue.newPassword))
        error.newPassword =
          "New password must be strong (min length : 8, min lowercase :1, min uppercase : 1, min numbers : 1, min symbols : 1)";

      //- Check Confirm password
      if (!isNotEmpty(inputValue.confirmPassword)) error.confirmPassword = "Confirm password is required";
      else if (inputValue.confirmPassword !== inputValue.newPassword)
        error.confirmPassword = "Confirm password and new password did not match";

      setErrorInput((prev) => ({ ...error }));

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
      toast.error(error.response.data.error);
      console.log(error.response.data.error);
    }
  }

  return (
    <form className="change-password-auth-form" onSubmit={handleOnSubmit}>
      <div className="input-group">
        <InputText
          type="password"
          placeholder="Old password"
          onChange={handleOnChangeOldPassword}
          ref={(el) => (inputEl.current[0] = el)}
          errorText={errorInput.oldPassword}
        />

        <InputText
          type="password"
          placeholder="New password"
          onChange={handleOnChangeNewPassword}
          ref={(el) => (inputEl.current[1] = el)}
          errorText={errorInput.newPassword}
        />

        <InputText
          type="password"
          placeholder="Confirm new password"
          onChange={handleOnChangeConfirmPassword}
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
