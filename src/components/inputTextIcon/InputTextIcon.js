function InputTextIcon(props) {
  const { placeholder = "Enter input", children, onChange } = props;

  return (
    <div className="input-text-icon-group">
      <input className="input-text-icon" placeholder={placeholder} type="text" onChange={onChange}></input>
      {children}
    </div>
  );
}

export default InputTextIcon;
