import { Link } from "react-router-dom";

import capFirstLetter from "../../../utilities/capFirstLetter";

import StarRating from "../../../components/starRating/StarRating";
import IconText from "../../../components/iconText/IconText";
import IconTextInfo from "../../../components/iconTextInfo/IconTextInfo";

function CampRowCard(props) {
  const { camp, star = 0 } = props;

  return (
    <div className="camp-row-card-group">
      <div className="image-group">
        <Link to={`/camp/${camp.id}`}>
          <img src={camp.CampImages[0].image} alt="camp" className="image" />
        </Link>
      </div>

      <div className="info-group">
        <Link className="camp-name" to={`/camp/${camp.id}`}>
          {camp.name}
        </Link>

        <StarRating type={star} />
        <IconText name={capFirstLetter(camp.Province.name)} type="location" />

        <div className="facility-group">
          {camp.CampInformations.map((item, index) => (
            <IconTextInfo
              key={item.id}
              title={item.InformationItem.title}
              iconImage={item.InformationItem.iconImage}
              subTitle1={item.subTitle1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CampRowCard;
