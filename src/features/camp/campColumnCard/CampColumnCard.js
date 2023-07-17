import { useNavigate } from "react-router-dom";

import IconText from "../../../components/iconText/IconText";
import StarRating from "../../../components/starRating/StarRating";

import { NO_IMAGE_AVAILABLE } from "../../../config/env";

function CampColumnCard(props) {
  const {
    campId,
    campName = "Camp name",
    campImage = NO_IMAGE_AVAILABLE,
    campProvince = "Province",
    noReview = "0",
    averageRating
  } = props;

  const navigate = useNavigate();

  function handleOnClickCamp() {
    navigate("/camp/" + campId);
  }

  return (
    <div className="camp-column-card-group" onClick={handleOnClickCamp}>
      <img className="camp-image" src={campImage} alt="camp" />
      <IconText type="location" name={campProvince} />
      <div className="camp-name">{campName}</div>
      <div className="camp-review-group">
        <StarRating type={averageRating} />
        <span className="camp-review">{noReview} Reviews</span>
      </div>
    </div>
  );
}

export default CampColumnCard;
