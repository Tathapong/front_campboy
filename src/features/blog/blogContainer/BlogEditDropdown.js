import { useCallback, useState } from "react";

import Confirm from "../../../components/confirm/Confirm";
import IconText from "../../../components/iconText/IconText";
import Modal from "../../../components/modal/Modal";
import OptionDropdown from "../../../components/optionDropdown/OptionDropdown";
import ShareSocial from "../../../components/shareSocial/ShareSocial";

import { useClickOutSide } from "../../../hooks/useClickOutside";

function BlogEditDropdown(props) {
  const { onClickDelete, onClickEdit } = props;

  const [dropdown, setDropdown] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [modalShareIsOpen, setModalShareIsOpen] = useState(false);

  const dropdownEl = useClickOutSide(useCallback(closeDropdown, []));

  function closeDropdown() {
    setDropdown(false);
  }

  function toggleDropdown() {
    setDropdown((previous) => !previous);
  }

  function openModalEdit() {
    setModalEditIsOpen(true);
  }
  function closeModalEdit() {
    setModalEditIsOpen(false);
  }

  function openModalDelete() {
    setModalDeleteIsOpen(true);
  }
  function closeModalDelete() {
    setModalDeleteIsOpen(false);
  }

  function openModalShare() {
    setModalShareIsOpen(true);
  }

  function closeModalIsShare() {
    setModalShareIsOpen(false);
  }

  function handleClickEdit() {
    closeDropdown();
    openModalEdit();
  }

  function handleClickDelete() {
    closeDropdown();
    openModalDelete();
  }

  async function handleClickConfirmEdit() {
    closeModalEdit();
    await onClickEdit();
  }

  return (
    <div className="blog-edit-dropdown-group" ref={dropdownEl}>
      <IconText type="vertical-dot" onClick={toggleDropdown} />
      <ul className={`blog-edit-dropdown-content ${dropdown ? "d-flex" : "d-none"} `}>
        <OptionDropdown title="Edit" onClick={handleClickEdit}>
          <i class="fa-solid fa-pen"></i>
        </OptionDropdown>

        <OptionDropdown title="Delete" onClick={handleClickDelete}>
          <i class="fa-solid fa-trash"></i>
        </OptionDropdown>
        <OptionDropdown title="Share" className="option-dropdown-share" onClick={openModalShare}>
          <i class="fa-solid fa-share"></i>
        </OptionDropdown>
      </ul>

      <Modal header="Change blog content" isOpen={modalEditIsOpen} closeModal={closeModalEdit}>
        <Confirm
          onConfirm={handleClickConfirmEdit}
          onCancel={closeModalEdit}
          text="Are you sure, you want to change the content ?"
        />
      </Modal>

      <Modal header="Delete Confirmation" isOpen={modalDeleteIsOpen} closeModal={closeModalDelete}>
        <Confirm
          onConfirm={onClickDelete}
          onCancel={closeModalDelete}
          text="Are you sure, you want to delete the blog ?"
        />
      </Modal>

      <Modal header="Share" className="modal-share" isOpen={modalShareIsOpen} closeModal={closeModalIsShare}>
        <ShareSocial />
      </Modal>
    </div>
  );
}

export default BlogEditDropdown;
