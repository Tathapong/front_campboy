import React from "react";
import Button from "../button/Button";

function Confirm(props) {
  const { onCancel, onConfirm, text = "Are you sure, you want to logout ?" } = props;

  return (
    <div className="confirm-dialog">
      <div className="text">{text}</div>
      <div className="button-group">
        <Button name="Confirm" onClick={onConfirm} />
        <Button name="Cancel" className="btn-cancel" onClick={onCancel} />
      </div>
    </div>
  );
}

export default Confirm;
