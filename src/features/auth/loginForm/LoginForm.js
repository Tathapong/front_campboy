import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { thunk_login } from "../../../stores/myUserSlice";

import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

function LoginForm(props) {
  const dispatch = useDispatch();
  const inputEl = useRef([]);
  const { switchToModalSignup, switchToModalForgot, closeModalLogin } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(thunk_login({ email, password }));
      setEmail("");
      setPassword("");
      inputEl.current[0].value = "";
      inputEl.current[1].value = "";
      toast.success("login successful");
      closeModalLogin();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <form className="login-auth-form" onSubmit={handleSubmitForm}>
      <div className="input-group">
        <InputText placeholder="Email address" setValue={setEmail} ref={(el) => (inputEl.current[0] = el)} />
        <InputText
          placeholder="Password"
          type="password"
          setValue={setPassword}
          ref={(el) => (inputEl.current[1] = el)}
        />
        <Link onClick={switchToModalForgot}>Forgot password?</Link>
      </div>
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
