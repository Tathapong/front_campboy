import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMe } from "../../../stores/myUserSlice";

import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import SidebarFollower from "../../../components/sidebarFollower/SidebarFollower";

function Sidebar(props) {
  const { profile, onClickMore, onClickEditProfile } = props;

  const params = useParams();
  const profileId = +params.profileId;
  const myUser = useSelector(selectMe);

  return (
    <div className="sidebar-profile-group">
      <ProfileTitle
        profileImage={profile?.profileImage}
        name={profile?.profileName}
        follower="104685"
        about={profile.profileAbout}
        onClickButton={() => {}}
        isMyUser={myUser?.id === profileId}
        onClickEditProfile={onClickEditProfile}
      />

      <div className="sidebar-follower-list">
        <SidebarFollower title="Following" onClickMore={onClickMore} />
      </div>
    </div>
  );
}

export default Sidebar;
