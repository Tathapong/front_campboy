import { Link } from "react-router-dom";
import millify from "millify";

import Button from "../button/Button";
import { DEFAULT_PROFILE_IMAGE } from "../../config/env";

function ProfileTitle(props) {
  const {
    type = "horizontal",
    profileImage = DEFAULT_PROFILE_IMAGE,
    name = "name",
    follower,
    about,
    since,
    to,
    isMember = false,
    isMyProfile = false,
    isFollower = false,
    onClickEditProfile,
    onClickFollowButton,
    onClickFollowerLink
  } = props;

  return (
    <div className={`${type}-profile-title-group`}>
      <Link to={to}>
        <img src={profileImage} alt="profile" className="image" />
      </Link>
      <div className="profile-info">
        <Link className="title" to={to}>
          {name}
        </Link>
        {follower ? (
          <Link className="follower" onClick={onClickFollowerLink}>{`${millify(follower)} Followers`}</Link>
        ) : (
          ""
        )}
        {about ? <div className="about" dangerouslySetInnerHTML={{ __html: about.replace(/\n/g, "<br>") }}></div> : ""}
        {since ? <div className="since">{since}</div> : ""}
      </div>

      {isMember ? (
        isMyProfile ? (
          ""
        ) : (
          <Button className={isFollower ? "btn-following" : "btn-follow"} onClick={onClickFollowButton}>
            {isFollower ? "Following" : "Follow"}
          </Button>
        )
      ) : (
        ""
      )}

      {isMyProfile ? <Button className="btn-edit-profile" name="Edit Profile" onClick={onClickEditProfile} /> : ""}
    </div>
  );
}

export default ProfileTitle;
