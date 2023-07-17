import { useSelector, useDispatch } from "react-redux";
import { selectMe } from "../../../stores/myUserSlice";

import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import SidebarFollower from "../../../components/sidebarFollower/SidebarFollower";

import { selectTopFiveFollowing, thunk_toggleFollow } from "../../../stores/profileSlice";

function SidebarProfile(props) {
  const { profile, onClickEditProfile, onClickShowFollower, onClickShowFollowing } = props;

  const dispatch = useDispatch();

  const myUser = useSelector(selectMe);
  const topFollowingProfile = useSelector(selectTopFiveFollowing);

  async function handleToggleFollow() {
    try {
      await dispatch(thunk_toggleFollow(profile.id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="sidebar-profile-group">
      <ProfileTitle
        type="vertical"
        about={profile.about}
        follower={profile.follower.length}
        isFollower={profile.isFollower}
        isMember={Boolean(myUser)}
        isMyProfile={profile.id === myUser?.id}
        name={`${profile.firstName} ${profile.lastName}`}
        profileImage={profile.profileImage}
        onClickEditProfile={onClickEditProfile}
        onClickFollowButton={handleToggleFollow}
        onClickFollowerLink={onClickShowFollower}
      />

      <div className="sidebar-follower-list">
        {topFollowingProfile.length ? (
          <SidebarFollower title="Following" followList={topFollowingProfile} onClickMore={onClickShowFollowing} />
        ) : (
          <div className="no-following">{`${profile.profileName} hasn't followed other yet`}</div>
        )}
      </div>
    </div>
  );
}

export default SidebarProfile;
