import CheckBox from "../checkBox/CheckBox";
import StarRating from "../starRating/StarRating";

function CheckBoxList(props) {
  const { title = "Title", list = [], type = "", className = "" } = props;

  return (
    <div className={`checkbox-list ${className}`}>
      <div className="title">{title}</div>
      {list.map((item) => (
        <CheckBox label={item.label} value={item.value} id={item.id}>
          {type === "star-rating" ? <StarRating type={item.value} /> : ""}
        </CheckBox>
      ))}
    </div>
  );
}

export default CheckBoxList;
