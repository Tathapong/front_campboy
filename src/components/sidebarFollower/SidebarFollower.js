import { memo } from "react";
import { Link } from "react-router-dom";

import FollowList from "../followList/FollowList";

function SidebarFollower(props) {
  const { title = "title", onClickMore, followList = [] } = props;

  return (
    <div className="sidebar-follower-group">
      <div className="sidebar-title">{title}</div>
      <FollowList followList={followList} />

      {followList.length >= 5 ? (
        <Link className="suggestions" onClick={onClickMore}>
          See more suggestions
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(SidebarFollower);
