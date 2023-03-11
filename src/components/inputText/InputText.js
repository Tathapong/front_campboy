function InputText(props) {
  const { placeholder = "Enter input", type = "text" } = props;

  return <input className="input-text" placeholder={placeholder} type={type}></input>;
}

export default InputText;
