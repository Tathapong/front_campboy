function InputTextIcon(props) {
  const { placeholder = "Enter input", type = "text", children } = props;

  return (
    <div className="input-text-icon-group">
      <input className="input-text-icon" placeholder={placeholder} type={type}></input>
      {children}
    </div>
  );
}

export default InputTextIcon;
