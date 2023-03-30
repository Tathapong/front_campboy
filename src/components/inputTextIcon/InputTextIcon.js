function InputTextIcon(props) {
  const { placeholder = "Enter input", children, setValue } = props;

  return (
    <div className="input-text-icon-group">
      <input
        className="input-text-icon"
        placeholder={placeholder}
        type="text"
        onChange={(ev) => setValue(ev.target.value)}
      ></input>
      {children}
    </div>
  );
}

export default InputTextIcon;
