import { Link } from "react-router-dom";
import ProfileTitle from "../profileTitle/ProfileTitle";

function SidebarFollower(props) {
  const { title = "title", onClickMore } = props;
  return (
    <div className="sidebar-follower-group">
      <div className="sidebar-title">{title}</div>
      <div className="profile-list">
        <ProfileTitle name="John Mayer" follower="21480" onClickFollow={{}} />
        <ProfileTitle name="Oliver Bee" follower="10400" onClickFollow={{}} />
        <ProfileTitle name="Nack Nio" follower="5900" onClickFollow={{}} />
        <ProfileTitle name="Paula Teller" follower="58800" onClickFollow={{}} />
        <ProfileTitle name="FranMorelandJohnssdfsdfsdfsdfsdfsdfsdfsdf" follower="44400" onClickFollow={{}} />
      </div>
      <Link className="suggestions" onClick={onClickMore}>
        See more suggestions
      </Link>
    </div>
  );
}

export default SidebarFollower;
