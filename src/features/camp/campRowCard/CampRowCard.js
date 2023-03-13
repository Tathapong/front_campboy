import camp from "../../../assets/images/camp1.jpg";
import { Link } from "react-router-dom";
import StarRating from "../../../components/starRating/StarRating";
import IconText from "../../../components/iconText/IconText";
import IconTextInfo from "../../../components/iconTextInfo/IconTextInfo";

function CampRowCard(props) {
  const {
    campName = "Camp name",
    star = 0,
    province = "Province",
    campImage = camp,
    price = 0,
    campId = "",
    services
  } = props;

  return (
    <div className="camp-row-card-group">
      <div className="image-price">
        <Link className="image-group" to={`/camp/${campId}`}>
          <img src={campImage} alt="camp" className="image" />
        </Link>

        <div className="price">
          <span>THB</span>
          <span>{price}</span>
        </div>
      </div>

      <div className="info-group">
        <Link className="camp-name" to={`/camp/${campId}`}>
          {campName}
        </Link>

        <StarRating type={star} />
        <IconText name={province} type="location" />

        <div className="facility-group">
          {services.map((item, index) => {
            if (index < 4) return <IconTextInfo title={item.title} iconImage={item.src} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default CampRowCard;
