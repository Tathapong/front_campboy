import { memo } from "react";
import ProfileTitle from "../profileTitle/ProfileTitle";

function FollowList(props) {
  const { followList = [] } = props;

  return (
    <div className="follower-list">
      {followList.map((profile) => (
        <ProfileTitle
          key={profile.profileId}
          name={profile.profileName}
          profileImage={profile.profileImage}
          about={profile.profileAbout ? JSON.parse(profile.profileAbout).replace(/\n/g, " ") : undefined}
          follower={profile.followerCount ?? undefined}
          to={`/profile/${profile.profileId}`}
        />
      ))}
    </div>
  );
}

export default memo(FollowList);
