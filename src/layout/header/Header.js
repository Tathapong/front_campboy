import "./header.css";

import Logo from "./Logo";
import TextButton from "./TextButton";
import Button from "./Button";
import ProfileDropdown from "../../components/profileDropdown/ProfileDropdown";

function Header() {
  return (
    <div className="nav col-8">
      <div className="nav-container">
        <Logo />
        <div className="textButton-group">
          <TextButton name="Home" to="/" />
          <TextButton name="Find a camp" to="/findacamp" />
          <TextButton name="Blog" to="blog" />
          <TextButton name="Join camp" to="join" />
        </div>

        <div className="authButton-group">
          <Button name="Login" type="button-login" />
          <Button name="Signup" type="button-signup" />
          <ProfileDropdown />
        </div>
      </div>
      <div className="textButton-outside-group">
        <TextButton name="Home" to="/" />
        <TextButton name="Find a camp" to="/findacamp" />
        <TextButton name="Blog" to="blog" />
        <TextButton name="Join camp" to="join" />
      </div>
    </div>
  );
}

export default Header;
