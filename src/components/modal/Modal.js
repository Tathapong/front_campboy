function Modal(props) {
  const { header = "Header", children, isOpen, closeModal } = props;

  return (
    <div className={`modal-group ${isOpen ? "d-block" : "d-none"}`} onMouseDown={closeModal}>
      <div className="modal-content" onMouseDown={(ev) => ev.stopPropagation()}>
        <i class="fa-solid fa-xmark" onClick={closeModal}></i>
        <div className="modal-header">{header}</div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
