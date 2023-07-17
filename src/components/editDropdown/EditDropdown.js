import { useCallback, useState } from "react";

import Confirm from "../confirm/Confirm";
import IconText from "../iconText/IconText";
import Modal from "../modal/Modal";
import OptionDropdown from "../optionDropdown/OptionDropdown";
import ShareSocial from "../shareSocial/ShareSocial";

import { useClickOutSide } from "../../hooks/useClickOutside";

function EditDropdown(props) {
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

  function handleOnClickEdit() {
    closeDropdown();
    openModalEdit();
  }

  function handleOnClickDelete() {
    closeDropdown();
    openModalDelete();
  }

  async function handleOnClickConfirmEdit() {
    closeModalEdit();
    await onClickEdit();
  }

  return (
    <div className="edit-dropdown-group" ref={dropdownEl}>
      <IconText type="vertical-dot" onClick={toggleDropdown} />
      <ul className={`edit-dropdown-content ${dropdown ? "d-flex" : "d-none"} `}>
        <OptionDropdown title="Edit" onClick={handleOnClickEdit}>
          <i class="fa-solid fa-pen"></i>
        </OptionDropdown>

        <OptionDropdown title="Delete" onClick={handleOnClickDelete}>
          <i class="fa-solid fa-trash"></i>
        </OptionDropdown>
        <OptionDropdown title="Share" className="option-dropdown-share" onClick={openModalShare}>
          <i class="fa-solid fa-share"></i>
        </OptionDropdown>
      </ul>

      <Modal className="modal-edit" header="Change content" isOpen={modalEditIsOpen} closeModal={closeModalEdit}>
        <Confirm
          onConfirm={handleOnClickConfirmEdit}
          onCancel={closeModalEdit}
          text="Are you sure, you want to change the content ?"
        />
      </Modal>

      <Modal
        className="modal-delete"
        header="Delete Confirmation"
        isOpen={modalDeleteIsOpen}
        closeModal={closeModalDelete}
      >
        <Confirm
          onConfirm={onClickDelete}
          onCancel={closeModalDelete}
          text="Are you sure, you want to delete the content ?"
        />
      </Modal>

      <Modal header="Share" className="modal-share" isOpen={modalShareIsOpen} closeModal={closeModalIsShare}>
        <ShareSocial />
      </Modal>
    </div>
  );
}

export default EditDropdown;
