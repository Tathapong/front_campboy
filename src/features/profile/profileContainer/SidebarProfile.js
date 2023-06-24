import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectMe } from "../../../stores/myUserSlice";

import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import SidebarFollower from "../../../components/sidebarFollower/SidebarFollower";
import { thunk_toggleFollow } from "../../../stores/profileSlice";

function Sidebar(props) {
  const { profile, onClickMore, onClickEditProfile } = props;

  const params = useParams();
  const dispatch = useDispatch();
  const profileId = +params.profileId;
  const myUser = useSelector(selectMe);

  async function handleToggleFollow() {
    try {
      await dispatch(thunk_toggleFollow(profileId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="sidebar-profile-group">
      <ProfileTitle
        profileImage={profile.profileImage}
        name={`${profile.firstName} ${profile.lastName}`}
        follower={profile.follower.length}
        about={profile.profileAbout}
        onClickEditProfile={onClickEditProfile}
        isMember={myUser}
        isMyProfile={profile.id === myUser?.id}
        isFollower={profile.isFollower}
        onClickFollowButton={handleToggleFollow}
      />

      <div className="sidebar-follower-list">
        <SidebarFollower title="Following" onClickMore={onClickMore} />
      </div>
    </div>
  );
}

export default Sidebar;
