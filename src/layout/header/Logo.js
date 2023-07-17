import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Logo() {
  return (
    <Link reloadDocument to="/">
      <img src={logo} className="logo" alt="logo" />
    </Link>
  );
}

export default Logo;
