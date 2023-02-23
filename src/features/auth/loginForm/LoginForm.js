import "./loginForm.css";

import { Link } from "react-router-dom";

import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

function LoginForm(props) {
  const { switchToModalSignup, switchToModalForgot } = props;

  return (
    <form className="login-form">
      <div className="input-group">
        <InputText placeholder="Email" />
        <InputText placeholder="Password" type="password" />
      </div>
      <Link onClick={switchToModalForgot}>Forgot password?</Link>
      <Button name="Login" type="submit" />
      <div>
        <span>Don't have an account? </span>
        <Link onClick={switchToModalSignup}>Signup</Link>
      </div>
    </form>
  );
}

export default LoginForm;
