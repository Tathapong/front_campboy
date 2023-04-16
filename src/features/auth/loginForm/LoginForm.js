import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import * as customValidator from "../../../validation/validation";
import { thunk_login } from "../../../stores/myUserSlice";
import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

function LoginForm(props) {
  const { switchToModalSignup, switchToModalForgot, closeModalLogin, openModalVerify } = props;

  const dispatch = useDispatch();
  const inputEl = useRef([]);

  const initialValue = { email: "", password: "" };
  const [inputValue, setInputValue] = useState({ ...initialValue });
  const [errorInput, setErrorInput] = useState({ ...initialValue });

  const onChangeEmail = (ev) => setInputValue((prev) => ({ ...prev, email: ev.target.value }));
  const onChangePassword = (ev) => setInputValue((prev) => ({ ...prev, password: ev.target.value }));

  const handleSubmitForm = async (ev) => {
    ev.preventDefault();

    try {
      //+ Validation
      const error = { ...initialValue };
      setErrorInput((prev) => ({ ...initialValue })); ///+ Reset error

      //- Check Email
      if (!customValidator.isNotEmpty(inputValue.email)) error.email = "Email address is required";
      else if (!customValidator.isEmail(inputValue.email)) error.email = "Email address is invalid format";

      //- Check Password
      if (!customValidator.isNotEmpty(inputValue.password)) error.password = "Password is required";
      else if (inputValue.password.length < 8)
        error.password = "Password is invalid format (length is less than 8 characters)";

      setErrorInput((prev) => ({ ...error })); ///+ Set error

      const isError = error.email || error.password;
      if (!isError) {
        const verify = await dispatch(thunk_login({ email: inputValue.email, password: inputValue.password }));

        inputEl.current.map((item) => (item.value = ""));
        setInputValue({ ...initialValue }); ///+ Reset input
        closeModalLogin();

        if (verify) toast.success("login successful");
        else openModalVerify();
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <form className="login-auth-form" onSubmit={handleSubmitForm}>
      <div className="input-group">
        <InputText
          placeholder="Email address"
          onChange={onChangeEmail}
          ref={(el) => (inputEl.current[0] = el)}
          errorText={errorInput.email}
        />

        <InputText
          placeholder="Password"
          type="password"
          onChange={onChangePassword}
          ref={(el) => (inputEl.current[1] = el)}
          errorText={errorInput.password}
        />
      </div>
      <Link onClick={switchToModalForgot}>Forgot password?</Link>
      <div className="button-group">
        <Button name="Login" type="submit" />
      </div>
      <div>
        <span>Don't have an account? </span>
        <Link onClick={switchToModalSignup}>Signup</Link>
      </div>
    </form>
  );
}

export default LoginForm;
