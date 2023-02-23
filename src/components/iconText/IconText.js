import "./iconText.css";
import { Link } from "react-router-dom";
function IconText(props) {
  const { children, name, type = "" } = props;

  return (
    <span className="icon-text-group">
      <span className={`icon ${type}`}>{children}</span>
      <Link className={`${type}`}>{name}</Link>
    </span>
  );
}

export default IconText;
