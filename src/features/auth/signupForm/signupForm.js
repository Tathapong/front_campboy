import { Link } from "react-router-dom";

import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";

function SignupForm(props) {
  const { switchToModalLogin } = props;
  return (
    <form className="signup-auth-form">
      <div className="input-group">
        <InputText placeholder="First name" />
        <InputText placeholder="Last name" />
        <InputText placeholder="Email or Mobile" />
        <InputText type="password" placeholder="Password" />
        <InputText type="password" placeholder="Confirm password" />
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
