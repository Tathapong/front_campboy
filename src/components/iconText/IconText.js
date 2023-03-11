import { Link } from "react-router-dom";

function IconText(props) {
  const { children, name, type = "" } = props;
  let iconTag;

  switch (type) {
    case "location": {
      iconTag = <i class="fa-solid fa-location-dot icon"></i>;
      break;
    }
    case "like": {
      iconTag = <i class="fa-solid fa-heart icon"></i>;
      break;
    }
    case "view-all-post": {
      iconTag = <i class="fa-solid fa-arrow-right icon"></i>;
      break;
    }
    case "facility": {
      iconTag = <span className={type}>{children}</span>;
      break;
    }
    default: {
      iconTag = children;
    }
  }

  return (
    <Link className={`icon-text-group ${type}`}>
      {iconTag}
      <span className="text">{name}</span>
    </Link>
  );
}

export default IconText;
