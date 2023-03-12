import { Link } from "react-router-dom";

import avatar1 from "../../assets/images/avatar1.jpg";

function ProfileTitle(props) {
  const { profileImage = avatar1, name = "name", option } = props;
  return (
    <div className="profile-title-group">
      <Link>
        <img src={profileImage} alt="profile" className="image" />
      </Link>
      <div className="profile-info">
        <Link className="title">{name}</Link>
        <span className="option">{option}</span>
      </div>
    </div>
  );
}

export default ProfileTitle;
