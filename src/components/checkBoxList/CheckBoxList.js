import { memo } from "react";

import CheckBox from "../checkBox/CheckBox";
import StarRating from "../starRating/StarRating";

function CheckBoxList(props) {
  const { title = "Title", list = [], type = "", className = "", setValue } = props;

  return (
    <div className={`checkbox-list ${className}`}>
      <div className="title">{title}</div>
      {list.map((item) => (
        <CheckBox key={item.id} label={item.label} value={item.value} setValue={setValue}>
          {type === "rating" ? <StarRating type={item.value} /> : ""}
        </CheckBox>
      ))}
    </div>
  );
}

export default memo(CheckBoxList);
