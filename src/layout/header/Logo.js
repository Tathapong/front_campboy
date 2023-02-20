import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link reloadDocument>
      <img src={logo} className="logo" alt="logo" />
    </Link>
  );
}

export default Logo;
