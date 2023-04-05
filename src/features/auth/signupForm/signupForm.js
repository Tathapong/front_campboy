import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import * as customValidator from "../../../validation/validation";
import { thunk_signup } from "../../../stores/myUserSlice";
import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

function SignupForm(props) {
  const { switchToModalLogin, closeModalSignup, openModalResendVerify } = props;
  const dispatch = useDispatch();
  const inputEl = useRef([]);

  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  const [inputValue, setInputValue] = useState({ ...initialValue });
  const [errorInput, setErrorInput] = useState({ ...initialValue });

  const onChangeFirstName = (ev) => setInputValue((prev) => ({ ...prev, firstName: ev.target.value }));
  const onChangeLastName = (ev) => setInputValue((prev) => ({ ...prev, lastName: ev.target.value }));
  const onChangeEmail = (ev) => setInputValue((prev) => ({ ...prev, email: ev.target.value }));
  const onChangePassword = (ev) => setInputValue((prev) => ({ ...prev, password: ev.target.value }));
  const onChangeConfirmPassword = (ev) => setInputValue((prev) => ({ ...prev, confirmPassword: ev.target.value }));

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      //+ Validation
      const error = { ...initialValue };
      setErrorInput((prev) => ({ ...initialValue })); ///+ Reset error

      //- Check First name
      if (!customValidator.isNotEmpty(inputValue.firstName)) error.firstName = "First name is required";

      //- Check Last name
      if (!customValidator.isNotEmpty(inputValue.lastName)) error.lastName = "Last name is required";

      //- Check Email
      if (!customValidator.isNotEmpty(inputValue.email)) error.email = "Email address is required";
      else if (!customValidator.isEmail(inputValue.email)) error.email = "Email address is invalid format";

      //- Check password
      if (!customValidator.isNotEmpty(inputValue.password)) error.password = "Password is required";
      else if (!customValidator.isStrongPassword(inputValue.password))
        error.password =
          "Password must be strong (min length : 8, min lowercase :1, min uppercase : 1, min numbers : 1, min symbols : 1)";

      //- Check confirm password
      if (!customValidator.isNotEmpty(inputValue.confirmPassword))
        error.confirmPassword = "Confirm password is required";
      else if (inputValue.confirmPassword !== inputValue.password)
        error.confirmPassword = "Confirm password and password did not match";

      setErrorInput((prev) => ({ ...error })); ///+ Set error

      const isError = error.firstName || error.lastName || error.email || error.password || error.confirmPassword;
      if (!isError) {
        const input = {
          firstName: inputValue.firstName,
          lastName: inputValue.lastName,
          email: inputValue.email,
          password: inputValue.password,
          confirmPassword: inputValue.confirmPassword
        };
        await dispatch(thunk_signup(input));
        inputEl.current.map((item) => (item.value = ""));

        setInputValue({ ...initialValue }); ///+ Reset input
        closeModalSignup();
        openModalResendVerify();
        toast.success("signup successful");
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <form className="signup-auth-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <InputText
          ref={(el) => (inputEl.current[0] = el)}
          placeholder="First name"
          onChange={onChangeFirstName}
          errorText={errorInput.firstName}
        />

        <InputText
          ref={(el) => (inputEl.current[1] = el)}
          placeholder="Last name"
          onChange={onChangeLastName}
          errorText={errorInput.lastName}
        />

        <InputText
          placeholder="Email address"
          ref={(el) => (inputEl.current[2] = el)}
          onChange={onChangeEmail}
          errorText={errorInput.email}
        />

        <InputText
          type="password"
          placeholder="Password"
          ref={(el) => (inputEl.current[3] = el)}
          onChange={onChangePassword}
          errorText={errorInput.password}
        />

        <InputText
          type="password"
          placeholder="Confirm password"
          ref={(el) => (inputEl.current[4] = el)}
          onChange={onChangeConfirmPassword}
          errorText={errorInput.confirmPassword}
        />
      </div>
      <div className="button-group">
        <Button name="Signup" type="submit" />
      </div>
      <div>
        <span>Already have an account? </span>
        <Link onClick={switchToModalLogin}>Login</Link>
      </div>
    </form>
  );
}

export default SignupForm;
