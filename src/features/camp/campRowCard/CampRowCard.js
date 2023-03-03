import "./campRowCard.css";

import camp from "../../../assets/images/camp1.jpg";
import { Link } from "react-router-dom";
import StarRating from "../../../components/starRating/StarRating";
import IconText from "../../../components/iconText/IconText";

function CampRowCard(props) {
  const { campName = "Camp name", star = 0, province = "Province", campImage = camp, price = 0 } = props;
  return (
    <div className="camp-row-card-group">
      <div className="camp-image">
        <img src={campImage} alt="camp" />
        <div className="price">
          <span>THB</span>
          <span>{price}</span>
        </div>
      </div>
      <div className="info">
        <Link className="camp-name">{campName}</Link>

        <StarRating type={star} />
        <IconText name={province} type="location">
          <i class="fa-solid fa-location-dot"></i>
        </IconText>
        <div className="facility-group">
          <IconText name="Free WiFi" type="facility">
            <i class="fa-solid fa-wifi"></i>
          </IconText>
          <IconText name="Breakfast" type="facility">
            <i class="fa-solid fa-utensils"></i>
          </IconText>
          <IconText name="Electric hook up" type="facility">
            <i class="fa-solid fa-plug"></i>
          </IconText>
          <IconText name="Toilet" type="facility">
            <i class="fa-solid fa-restroom"></i>
          </IconText>
        </div>
      </div>
    </div>
  );
}

export default CampRowCard;
