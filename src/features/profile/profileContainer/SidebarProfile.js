import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import SidebarFollower from "../../../components/sidebarFollower/SidebarFollower";

function Sidebar(props) {
  const { profile_name, profile_image, profile_about = " ", onClickMore } = props;

  return (
    <div className="sidebar-profile-group">
      <ProfileTitle
        profileImage={profile_image}
        name={profile_name}
        follower="104685"
        about={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`}
        onClickButton={() => {}}
      />

      <div className="sidebar-follower-list">
        <SidebarFollower title="Following" onClickMore={onClickMore} />
      </div>
    </div>
  );
}

export default Sidebar;
