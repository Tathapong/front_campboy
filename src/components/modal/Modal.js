import { memo } from "react";

const Modal = memo(function Modal(props) {
  const { header = "Header", children, isOpen, closeModal, className = "" } = props;

  return (
    <div className={`modal-group ${isOpen ? "d-block" : "d-none"} ${className}`} onMouseDown={closeModal}>
      <div className="modal-content" onMouseDown={(ev) => ev.stopPropagation()}>
        <i class="fa-solid fa-xmark" onClick={closeModal}></i>
        <div className="modal-header">{header}</div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
});

export default Modal;
