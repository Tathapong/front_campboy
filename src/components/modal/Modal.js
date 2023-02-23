import "./modal.css";

function Modal(props) {
  const { header = "Header", children, isOpen, closeModal } = props;

  return (
    <div className={`modal ${isOpen ? "display-block" : "display-none"}`} onClick={closeModal}>
      <div className={`modal-content `} onClick={(ev) => ev.stopPropagation()}>
        <i class="fa-solid fa-xmark" onClick={closeModal}></i>
        <div className="modal-header">{header}</div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
