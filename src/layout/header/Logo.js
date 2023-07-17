import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link reloadDocument to="/">
      <img
        src={"https://res.cloudinary.com/duzw1g3u8/image/upload/v1689616010/Campboy/assets/logo_huhtss.png"}
        className="logo"
        alt="logo"
      />
    </Link>
  );
}

export default Logo;
