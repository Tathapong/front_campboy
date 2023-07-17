function InputTextIcon(props) {
  const { placeholder = "Enter input", children, value, setValue } = props;

  function handleOnChangeInput(ev) {
    setValue(ev.target.value);
  }

  return (
    <div className="input-text-icon-group">
      <input
        className="input-text-icon"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={handleOnChangeInput}
      ></input>
      {children}
    </div>
  );
}

export default InputTextIcon;
