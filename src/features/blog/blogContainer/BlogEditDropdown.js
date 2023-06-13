import { useCallback, useState } from "react";

import IconText from "../../../components/iconText/IconText";
import OptionDropdown from "../../../components/optionDropdown/OptionDropdown";
import Modal from "../../../components/modal/Modal";
import ShareSocial from "../../../components/shareSocial/ShareSocial";

import { useClickOutSide } from "../../../hooks/useClickOutside";
import Confirm from "../../../components/confirm/Confirm";

function BlogEditDropdown(props) {
  const { onClickDelete, onClickEdit } = props;

  const [dropdown, setDropdown] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [modalShareIsOpen, setModalShareIsOpen] = useState(false);

  const closeDropdown = () => setDropdown(false);
  const toggleDropdown = () => setDropdown((previous) => !previous);

  const openModalEdit = () => setModalEditIsOpen(true);
  const closeModalEdit = () => setModalEditIsOpen(false);

  const openModalDelete = () => setModalDeleteIsOpen(true);
  const closeModalDelete = () => setModalDeleteIsOpen(false);

  const openModalShare = () => setModalShareIsOpen(true);
  const closeModalIsShare = () => setModalShareIsOpen(false);

  const dropdownEl = useClickOutSide(useCallback(closeDropdown, []));

  const handleEdit = () => {
    closeDropdown();
    openModalEdit();
  };

  const handleDelete = () => {
    closeDropdown();
    openModalDelete();
  };

  const handleConfirmEdit = async () => {
    closeModalEdit();
    await onClickEdit();
  };

  return (
    <div className="blog-edit-dropdown-group" ref={dropdownEl}>
      <IconText type="vertical-dot" onClick={toggleDropdown} />
      <ul className={`blog-edit-dropdown-content ${dropdown ? "d-flex" : "d-none"} `}>
        <OptionDropdown title="Edit" onClick={handleEdit}>
          <i class="fa-solid fa-pen"></i>
        </OptionDropdown>

        <OptionDropdown title="Delete" onClick={handleDelete}>
          <i class="fa-solid fa-trash"></i>
        </OptionDropdown>
        <OptionDropdown title="Share" className="option-dropdown-share" onClick={openModalShare}>
          <i class="fa-solid fa-share"></i>
        </OptionDropdown>
      </ul>

      <Modal header="Change blog content" isOpen={modalEditIsOpen} closeModal={closeModalEdit}>
        <Confirm
          onConfirm={handleConfirmEdit}
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
