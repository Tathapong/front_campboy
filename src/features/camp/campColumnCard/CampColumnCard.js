import "./campColumnCard.css";
import { Link } from "react-router-dom";
import camp1 from "../../../assets/images/camp1.jpg";

import IconText from "../../../components/iconText/IconText";
import StarRating from "../../../components/starRating/StarRating";

function CampColumnCard(props) {
  const { province = "Province", campName = "Camp name", rate, noReview = "99", image = camp1 } = props;
  return (
    <div className="camp-column-card-group">
      <img className="camp-image" src={image} alt="camp" />
      <IconText type="location" name={province}>
        <i class="fa-solid fa-location-dot"></i>
      </IconText>
      <Link className="camp-name">{campName}</Link>
      <div className="camp-review-group">
        <StarRating />
        <Link className="camp-review">{noReview} Reviews</Link>
      </div>
    </div>
  );
}

export default CampColumnCard;
