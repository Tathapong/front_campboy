import "./button.css";

function Button(props) {
  const { name, type = "button", onClick, classOption = "" } = props;
  return (
    <button className={`button ${classOption}`} onClick={onClick} type={type}>
      {name}
    </button>
  );
}

export default Button;
