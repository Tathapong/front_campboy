import { Link } from "react-router-dom";

import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

function LoginForm(props) {
  const { switchToModalSignup, switchToModalForgot } = props;

  return (
    <form className="login-auth-form">
      <div className="input-group">
        <InputText placeholder="Email" />
        <InputText placeholder="Password" type="password" />
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
