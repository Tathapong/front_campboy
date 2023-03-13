import { Link } from "react-router-dom";
import camp1 from "../../../assets/images/camp1.jpg";

import IconText from "../../../components/iconText/IconText";
import StarRating from "../../../components/starRating/StarRating";

function CampColumnCard(props) {
  const { province = "Province", campName = "Camp name", rate, noReview = "99", image = camp1 } = props;
  return (
    <div className="camp-column-card-group">
      <img className="camp-image" src={image} alt="camp" />
      <IconText type="location" name={province} />
      <Link className="camp-name">{campName}</Link>
      <Link className="camp-review-group">
        <StarRating />
        <span className="camp-review">{noReview} Reviews</span>
      </Link>
    </div>
  );
}

export default CampColumnCard;
