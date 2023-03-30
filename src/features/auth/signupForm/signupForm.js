import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { thunk_signup } from "../../../stores/myUserSlice";
import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";
import { toast } from "react-toastify";

function SignupForm(props) {
  const { switchToModalLogin, closeModalSignup } = props;
  const dispatch = useDispatch();
  const inputEl = useRef([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault();
      const input = { firstName, lastName, emailOrMobile, password, confirmPassword };
      await dispatch(thunk_signup(input));
      inputEl.current.map((item) => (item.value = ""));
      closeModalSignup();
      toast.success("signup successful");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <form className="signup-auth-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <InputText placeholder="First name" ref={(el) => (inputEl.current[0] = el)} setValue={setFirstName} />
        <InputText placeholder="Last name" ref={(el) => (inputEl.current[1] = el)} setValue={setLastName} />
        <InputText placeholder="Email or Mobile" ref={(el) => (inputEl.current[2] = el)} setValue={setEmailOrMobile} />
        <InputText
          type="password"
          placeholder="Password"
          ref={(el) => (inputEl.current[3] = el)}
          setValue={setPassword}
        />
        <InputText
          type="password"
          placeholder="Confirm password"
          ref={(el) => (inputEl.current[4] = el)}
          setValue={setConfirmPassword}
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
