import { Link } from "react-router-dom";
import ProfileTitle from "../profileTitle/ProfileTitle";

function SidebarFollower(props) {
  const { title = "title", onClickMore } = props;
  return (
    <div className="sidebar-follower-group">
      <div className="sidebar-title">{title}</div>
      <div className="profile-list">
        <ProfileTitle name="John Mayer" follower="21480" onClickButton={{}} />
        <ProfileTitle name="Oliver Bee" follower="10400" onClickButton={{}} />
        <ProfileTitle name="Nack Nio" follower="5900" onClickButton={{}} />
        <ProfileTitle name="Paula Teller" follower="58800" onClickButton={{}} />
        <ProfileTitle name="FranMorelandJohnssdfsdfsdfsdfsdfsdfsdfsdf" follower="44400" onClickButton={{}} />
      </div>
      <Link className="suggestions" onClick={onClickMore}>
        See more suggestions
      </Link>
    </div>
  );
}

export default SidebarFollower;
