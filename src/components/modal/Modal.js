import "./modal.css";

function Modal(props) {
  const { header = "Header", children, isOpen, closeModal } = props;

  return (
    <div className={`modal ${isOpen ? "display-block" : "display-none"}`} onClick={closeModal}>
      <div className={`modal-content `} onClick={(ev) => ev.stopPropagation()}>
        <div className="modal-header">
          {header}
          <i class="fa-solid fa-xmark" onClick={closeModal}></i>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
