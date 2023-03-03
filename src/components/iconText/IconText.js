import "./iconText.css";
import { Link } from "react-router-dom";
function IconText(props) {
  const { children, name, type = "" } = props;

  return (
    <Link className="icon-text-group">
      <span className={`icon ${type}`}>{children}</span>
      <span className={`${type}`}>{name}</span>
    </Link>
  );
}

export default IconText;
