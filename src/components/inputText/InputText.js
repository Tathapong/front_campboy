import "./inputText.css";

function InputText(props) {
  const { placeholder = "Enter input", type = "text" } = props;
  return <input className="inputText" placeholder={placeholder} type={type} />;
}

export default InputText;
