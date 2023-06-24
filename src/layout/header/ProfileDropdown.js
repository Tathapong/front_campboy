import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useClickOutSide } from "../../hooks/useClickOutside";
import { toast } from "react-toastify";

import { thunk_logout, selectMe } from "../../stores/myUserSlice";

import Modal from "../../components/modal/Modal";
import ChangePasswordForm from "../../features/auth/changePassword/ChangePasswordForm";
import Confirm from "../../components/confirm/Confirm";
import OptionDropdown from "../../components/optionDropdown/OptionDropdown";

function ProfileDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myUser = useSelector(selectMe);

  const [dropdown, setDropdown] = useState(false);
  const [modalChangeIsOpen, setModalChangeIsOpen] = useState(false);
  const [modalConfirmLogout, setMofalConfirmLogout] = useState(false);

  const openModalChange = () => setModalChangeIsOpen(true);
  const closeModalChange = () => setModalChangeIsOpen(false);

  const openModalConfirmLogout = () => setMofalConfirmLogout(true);
  const closeModalConfirmLogout = () => setMofalConfirmLogout(false);

  const closeDropdown = () => setDropdown(false);
  const toggleDropdown = () => setDropdown((previous) => !previous);

  const dropdownEl = useClickOutSide(useCallback(closeDropdown, []));

  const openConfirmDialog = () => {
    closeDropdown();
    openModalConfirmLogout();
  };

  const handleChangePassword = () => {
    closeDropdown();
    openModalChange();
  };

  const handleLogout = async () => {
    try {
      await dispatch(thunk_logout());
      closeModalConfirmLogout();
      toast.success("Logout successful");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  function handleToProfile() {
    navigate(`/profile/${myUser?.id}`);
    closeDropdown();
  }

  return (
    <div className="profile-dropdown-group" ref={dropdownEl}>
      <Link onClick={toggleDropdown}>
        <img src={myUser.profileImage} alt="profile" className="profile-image"></img>
      </Link>
      <ul className={`profile-dropdown-content ${dropdown ? "d-flex" : "d-none"}`}>
        <div className="profile-name">Hello! {myUser.firstName}</div>
        <OptionDropdown title="View profile" onClick={handleToProfile}>
          <i class="fa-solid fa-user"></i>
        </OptionDropdown>
        <OptionDropdown title="Change password" onClick={handleChangePassword}>
          <i class="fa-solid fa-unlock"></i>
        </OptionDropdown>
        <OptionDropdown title="Logout" onClick={openConfirmDialog}>
          <i class="fa-solid fa-right-from-bracket"></i>
        </OptionDropdown>
      </ul>
      <Modal header="Change password" isOpen={modalChangeIsOpen} closeModal={closeModalChange}>
        <ChangePasswordForm closeModal={closeModalChange} />
      </Modal>
      <Modal header="Confirm Logout" isOpen={modalConfirmLogout} closeModal={closeModalConfirmLogout}>
        <Confirm onCancel={closeModalConfirmLogout} onConfirm={handleLogout} />
      </Modal>
    </div>
  );
}

export default ProfileDropdown;
