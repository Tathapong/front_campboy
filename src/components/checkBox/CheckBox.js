function CheckBox(props) {
  const { id, label = "label", value, children } = props;
  return (
    <div className="check-box-group">
      <input type="checkbox" name={id} id={id} value={value} className="input" />
      <label htmlFor={id} className="label">
        {label}
        {children}
      </label>
    </div>
  );
}

export default CheckBox;
