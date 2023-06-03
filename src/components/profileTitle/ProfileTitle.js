import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../button/Button";
import millify from "millify";

import avatar1 from "../../assets/images/avatar1.jpg";

function ProfileTitle(props) {
  const { profileImage = avatar1, name = "name", follower, about, onClickButton } = props;

  const [follow, setFollow] = useState(false);

  const toggleState = () => setFollow((prev) => !prev);

  return (
    <div className="profile-title-group">
      <div className="image-info">
        <Link>
          <img src={profileImage} alt="profile" className="image" />
        </Link>
        <div className="profile-info">
          <Link className="title">{name}</Link>
          {follower ? <span className="follower">{`${millify(follower)} Followers`}</span> : ""}
          {about ? <span className="about">{about}</span> : ""}
        </div>
      </div>

      {onClickButton ? (
        follow ? (
          <Button className="btn-following" onClick={toggleState}>
            Following
          </Button>
        ) : (
          <Button className="btn-follow" onClick={toggleState}>
            Follow
          </Button>
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default ProfileTitle;
