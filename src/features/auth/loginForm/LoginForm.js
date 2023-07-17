import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

import { isNotEmpty, isEmail } from "../../../validation/validation";
import { thunk_login } from "../../../stores/myUserSlice";

function LoginForm(props) {
  const { switchToModalSignup, switchToModalForgot, closeModalLogin, openModalVerify } = props;

  const dispatch = useDispatch();
  const inputEl = useRef([]);

  const initialValue = { email: "", password: "" };
  const [inputValue, setInputValue] = useState({ ...initialValue });
  const [errorInput, setErrorInput] = useState({ ...initialValue });

  function handleOnChangeEmail(ev) {
    setInputValue((prev) => ({ ...prev, email: ev.target.value }));
  }
  function handleOnChangePassword(ev) {
    setInputValue((prev) => ({ ...prev, password: ev.target.value }));
  }

  async function handleOnSubmitForm(ev) {
    ev.preventDefault();

    try {
      //+ Validation
      const error = { ...initialValue };
      setErrorInput((prev) => ({ ...initialValue }));

      //- Check Email
      if (!isNotEmpty(inputValue.email)) error.email = "Email address is required";
      else if (!isEmail(inputValue.email)) error.email = "Email address is invalid format";

      //- Check Password
      if (!isNotEmpty(inputValue.password)) error.password = "Password is required";
      else if (inputValue.password.length < 8)
        error.password = "Password is invalid format (length is less than 8 characters)";

      setErrorInput((prev) => ({ ...error }));

      const isError = error.email || error.password;
      if (!isError) {
        const verify = await dispatch(thunk_login({ email: inputValue.email, password: inputValue.password }));

        inputEl.current.map((item) => (item.value = ""));
        setInputValue({ ...initialValue });
        closeModalLogin();

        if (verify) toast.success("login successful");
        else openModalVerify();
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  }

  return (
    <form className="login-auth-form" onSubmit={handleOnSubmitForm}>
      <div className="input-group">
        <InputText
          placeholder="Email address"
          onChange={handleOnChangeEmail}
          ref={(el) => (inputEl.current[0] = el)}
          errorText={errorInput.email}
        />

        <InputText
          placeholder="Password"
          type="password"
          onChange={handleOnChangePassword}
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
