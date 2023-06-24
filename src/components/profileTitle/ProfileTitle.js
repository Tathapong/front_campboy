import { Link } from "react-router-dom";

import Button from "../button/Button";
import millify from "millify";

import avatar1 from "../../assets/images/avatar1.jpg";

function ProfileTitle(props) {
  const {
    profileImage = avatar1,
    name = "name",
    follower,
    about,
    since,
    to,
    onClickEditProfile,
    onClickFollowButton,
    isMember = false,
    isMyProfile = false,
    isFollower = false
  } = props;

  return (
    <div className="profile-title-group">
      <div className="image-info">
        <Link>
          <img src={profileImage} alt="profile" className="image" />
        </Link>
        <div className="profile-info">
          <Link className="title" to={to}>
            {name}
          </Link>
          {follower ? <span className="follower">{`${millify(follower)} Followers`}</span> : ""}
          {about ? (
            <span className="about" dangerouslySetInnerHTML={{ __html: about.replace(/\n/g, "<br>") }}></span>
          ) : (
            ""
          )}
          {since ? <span className="since">{since}</span> : ""}
        </div>
      </div>

      {isMember ? (
        !isMyProfile ? (
          <Button className={isFollower ? "btn-following" : "btn-follow"} onClick={onClickFollowButton}>
            {isFollower ? "Following" : "Follow"}
          </Button>
        ) : (
          ""
        )
      ) : (
        ""
      )}

      {isMyProfile ? <Button className="btn-edit-profile" name="Edit Profile" onClick={onClickEditProfile} /> : ""}
    </div>
  );
}

export default ProfileTitle;
