import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import * as customValidator from "../../../validation/validation";
import { thunk_verifyLink, thunk_resetPassword } from "../../../stores/myUserSlice";

import Loading from "../../../components/spinner/Loading";
import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

function ResetPasswordEmail() {
  const { hashedToken, userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputEl = useRef([]);

  const initialValue = { newPassword: "", confirmPassword: "" };
  const [verified, setVerified] = useState(false);
  const [success, setSuccess] = useState(false);
  const [inputValue, setInputValue] = useState({ ...initialValue });
  const [errorInput, setErrorInput] = useState({ ...initialValue });

  const onChangeNewPassword = (ev) => setInputValue((prev) => ({ ...prev, newPassword: ev.target.value }));
  const onChangeConfirmPassword = (ev) => setInputValue((prev) => ({ ...prev, confirmPassword: ev.target.value }));

  useEffect(() => {
    const verify = async () => {
      try {
        await dispatch(thunk_verifyLink(userId, hashedToken));
        setVerified(true);
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
    };
    verify();
  }, [hashedToken, userId, dispatch]);

  const onSubmitForm = async (ev) => {
    ev.preventDefault();
    try {
      const error = { ...initialValue };
      setErrorInput((prev) => ({ ...initialValue }));

      //+Validation
      //- Check existing of input
      if (!customValidator.isNotEmpty(inputValue.newPassword)) error.newPassword = "New password is required";
      if (!customValidator.isNotEmpty(inputValue.confirmPassword))
        error.confirmPassword = "Confirm password is required";

      //- Check strong password
      if (!customValidator.isStrongPassword(inputValue.newPassword))
        error.newPassword =
          "Password must be strong (min length : 8, min lowercase :1, min uppercase : 1, min numbers : 1, min symbols : 1)";

      //- Check match password and confirm password
      if (inputValue.newPassword !== inputValue.confirmPassword)
        error.confirmPassword = "Confirm password and new password did not match";

      setErrorInput((prev) => ({ ...error }));

      const isError = error.newPassword || error.confirmPassword;

      if (!isError) {
        await dispatch(thunk_resetPassword(userId, hashedToken, inputValue.newPassword, inputValue.confirmPassword));
        inputEl.current.map((item) => (item.value = ""));

        setInputValue({ ...initialValue });
        setSuccess(true);
        toast.success("Reset password successful");
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {verified ? (
        success ? (
          <div className="verify-confirm">
            <i class="fa-sharp fa-solid fa-circle-check icon"></i>
            <div>Reset Password Completed</div>
            <Button onClick={() => navigate("/")}>OK</Button>
          </div>
        ) : (
          <form className="reset-password-auth-form" onSubmit={onSubmitForm}>
            <h1 className="title">Reset password</h1>
            <div className="sub-title">Enter your new password below</div>
            <div className="input-group">
              <InputText
                type="password"
                ref={(el) => (inputEl.current[0] = el)}
                placeholder="New password"
                onChange={onChangeNewPassword}
                errorText={errorInput.newPassword}
              />
              <InputText
                type="password"
                ref={(el) => (inputEl.current[1] = el)}
                placeholder="Confirm the new password"
                onChange={onChangeConfirmPassword}
                errorText={errorInput.confirmPassword}
              />
            </div>
            <div className="button-group">
              <Button type="submit">Confirm</Button>
            </div>
          </form>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ResetPasswordEmail;
