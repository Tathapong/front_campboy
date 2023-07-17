import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

import { thunk_sendResetPassword } from "../../../stores/myUserSlice";
import { isNotEmpty, isEmail } from "../../../validation/validation";
import * as constant from "../../../config/constant";

function ForgotPasswordForm(props) {
  const { closeModalForgot, openModalResendForgot } = props;
  const dispatch = useDispatch();
  const inputEl = useRef("");

  const [email, setEmail] = useState("");
  const [errorInput, setErrorInput] = useState("");

  function handleOnChangeEmail(ev) {
    setEmail(ev.target.value);
  }

  async function handleOnSubmit(ev) {
    ev.preventDefault();

    try {
      //+ Validation
      let error;
      setErrorInput("");

      //- Check Email
      if (!isNotEmpty(email)) error = "Email address is required";
      else if (!isEmail(email)) error = "Email address is invalid format";

      setErrorInput(error);

      if (!error) {
        await dispatch(thunk_sendResetPassword(email, constant.RESET_PASSWORD));

        inputEl.current.value = "";
        setEmail("");

        closeModalForgot();
        openModalResendForgot();
        toast.success("Reset password link have sent to your email");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  }

  return (
    <form className="forgot-password-auth-form" onSubmit={handleOnSubmit}>
      <span className="title">Enter your email address</span>
      <div className="input-group">
        <InputText
          ref={inputEl}
          placeholder="Enter email address"
          onChange={handleOnChangeEmail}
          errorText={errorInput}
        />
      </div>
      <div className="button-group">
        <Button name="Confirm" type="submit" />
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
