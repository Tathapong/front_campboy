import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { thunk_sendResetPassword } from "../../../stores/myUserSlice";
import { toast } from "react-toastify";

import * as customValidator from "../../../validation/validation";
import * as constant from "../../../config/constant";
import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

function ForgotPasswordForm(props) {
  const { closeModalForgot, openModalResendForgot } = props;
  const dispatch = useDispatch();
  const inputEl = useRef("");

  const [email, setEmail] = useState("");
  const [errorInput, setErrorInput] = useState("");

  const onChangeEmail = (ev) => setEmail(ev.target.value);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      //+ Validation
      let error;
      setErrorInput(""); ///+ Reset error

      //- Check Email
      if (!customValidator.isNotEmpty(email)) error = "Email address is required";
      else if (!customValidator.isEmail(email)) error = "Email address is invalid format";

      setErrorInput(error); ///+ Set error

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
  };

  return (
    <form className="forgot-password-auth-form" onSubmit={handleSubmit}>
      <span className="title">Enter your email address</span>
      <div className="input-group">
        <InputText ref={inputEl} placeholder="Enter email address" onChange={onChangeEmail} errorText={errorInput} />
      </div>
      <div className="button-group">
        <Button name="Confirm" type="submit" />
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
