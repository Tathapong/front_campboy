import { Link } from "react-router-dom";

function IconText(props) {
  const { children, name, type = "", to, state, onClick, isActive = false, unauthorized = false } = props;

  let iconTag;

  if (type === "location") iconTag = <i className="fa-solid fa-location-dot icon"></i>;
  else if (type === "view-all-post") iconTag = <i className="fa-solid fa-arrow-right icon"></i>;
  else if (type === "facility") iconTag = <span className={type}>{children}</span>;
  else if (type === "vertical-dot") iconTag = <i className="fa-solid fa-ellipsis-vertical icon"></i>;
  else if (type === "outdent") iconTag = <i class="fa-solid fa-outdent fa-flip-horizontal icon"></i>;
  else if (type === "camera") iconTag = <i class="fa-solid fa-camera icon"></i>;
  else if (type === "comment")
    iconTag = isActive ? (
      <i class="fa-solid fa-message fa-flip-horizontal icon"></i>
    ) : (
      <i class="fa-regular fa-message fa-flip-horizontal icon"></i>
    );
  else if (type === "like")
    iconTag = isActive ? <i className="fa-solid fa-heart icon" /> : <i className="fa-regular fa-heart icon" />;
  else if (type === "save-post")
    iconTag = isActive ? <i className="fa-solid fa-bookmark icon" /> : <i className="fa-regular fa-bookmark icon" />;
  else iconTag = children;

  return (
    <Link
      className={`icon-text-group ${type} ${unauthorized ? "cursor-not-allowed" : ""}`}
      to={to}
      state={state}
      onClick={unauthorized ? undefined : onClick}
    >
      {iconTag}
      <span className="text">{name}</span>
    </Link>
  );
}

export default IconText;
