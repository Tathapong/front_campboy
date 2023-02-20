import { Link } from "react-router-dom";
import "./profile.css";
import OptionDropdown from "./OptionDropdown";

import avatar from "../../assets/images/avatar1.jpg";

import { useState, useCallback } from "react";
import { useClickOutSide } from "../../hooks/useClickOutside";

function ProfileDropdown() {
  const [dropdown, setDropdown] = useState(false);
  const closeDropdown = useCallback(() => setDropdown(false), []);
  const dropdownEl = useClickOutSide(closeDropdown);

  return (
    <div className="profile-dropdown-group" ref={dropdownEl}>
      <Link onClick={() => setDropdown((previous) => !previous)}>
        <img src={avatar} alt="profile"></img>
      </Link>
      <ul className={`profile-dropdown-content ${dropdown ? "display-flex" : ""}`}>
        <OptionDropdown title="View profile">
          <i class="fa-solid fa-user"></i>
        </OptionDropdown>
        <OptionDropdown title="Change password">
          <i class="fa-solid fa-unlock"></i>
        </OptionDropdown>
        <OptionDropdown title="Logout">
          <i class="fa-solid fa-right-from-bracket"></i>
        </OptionDropdown>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
