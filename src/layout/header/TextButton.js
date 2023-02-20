import { Link } from "react-router-dom";

function TextButton(props) {
  const { name, to } = props;
  return (
    <Link className="textButton" to={to}>
      {name}
    </Link>
  );
}

export default TextButton;
