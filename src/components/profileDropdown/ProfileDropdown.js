import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import { useClickOutSide } from "../../hooks/useClickOutside";

import Modal from "../modal/Modal";
import OptionDropdown from "./OptionDropdown";
import ChangePasswordForm from "../../features/auth/changePassword/ChangePasswordForm";

import avatar from "../../assets/images/avatar1.jpg";

function ProfileDropdown() {
  const [dropdown, setDropdown] = useState(false);
  const [modalChangeIsOpen, setModalChangeIsOpen] = useState(false);

  const openModalChange = () => setModalChangeIsOpen(true);
  const closeModalChange = () => setModalChangeIsOpen(false);

  const closeDropdown = () => setDropdown(false);
  const toggleDropdown = () => setDropdown((previous) => !previous);

  const dropdownEl = useClickOutSide(useCallback(closeDropdown, []));

  const handleChangePassword = () => {
    openModalChange();
    closeDropdown();
  };

  return (
    <div className="profile-dropdown-group" ref={dropdownEl}>
      <Link onClick={toggleDropdown}>
        <img src={avatar} alt="profile" className="profile-image"></img>
      </Link>
      <ul className={`profile-dropdown-content ${dropdown ? "d-flex" : "d-none"}`}>
        <OptionDropdown title="View profile">
          <i class="fa-solid fa-user"></i>
        </OptionDropdown>
        <OptionDropdown title="Change password" onClick={handleChangePassword}>
          <i class="fa-solid fa-unlock"></i>
        </OptionDropdown>
        <OptionDropdown title="Logout">
          <i class="fa-solid fa-right-from-bracket"></i>
        </OptionDropdown>
      </ul>
      <Modal header="Change password" isOpen={modalChangeIsOpen} closeModal={closeModalChange}>
        <ChangePasswordForm closeModal={closeModalChange} />
      </Modal>
    </div>
  );
}

export default ProfileDropdown;
