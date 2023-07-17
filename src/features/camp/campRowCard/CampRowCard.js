import { memo } from "react";
import { Link } from "react-router-dom";

import StarRating from "../../../components/starRating/StarRating";
import IconText from "../../../components/iconText/IconText";
import IconTextInfo from "../../../components/iconTextInfo/IconTextInfo";
import Button from "../../../components/button/Button";

import { capFirstLetter } from "../../../utilities/capFirstLetter";

function CampRowCard(props) {
  const { camp, setMapItem, isMap } = props;

  function handleOnClickMapButton() {
    if (!isMap)
      setMapItem((prev) => [...prev, { lat: +camp.locationLat, lng: +camp.locationLng, id: camp.id, name: camp.name }]);
    else setMapItem((prev) => [...prev].filter((item) => item.id !== camp.id));
  }

  return (
    <div className="camp-row-card-group">
      <div className="image-group">
        <Link to={`/camp/${camp.id}`}>
          <img src={camp.coverImage} alt="camp" className="image" />
        </Link>
      </div>

      <div className="info-group">
        <div className="camp-name-group">
          <Link className="camp-name" to={`/camp/${camp.id}`}>
            {camp.name}
          </Link>
          <Button className={isMap ? "btn-active" : ""} onClick={handleOnClickMapButton}>
            <i class="fa-solid fa-map-pin icon" />
          </Button>
        </div>

        <div>
          <StarRating type={camp.scores} />
          <span className="rating-count">({camp.reviewCount})</span>
        </div>

        <IconText name={capFirstLetter(camp.provinceName)} type="location" />

        <div className="facility-group">
          {camp.CampInformations.map((item, index) => (
            <IconTextInfo key={item.id} title={item.title} iconImage={item.iconImage} subTitle1={item.subTitle1} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(CampRowCard);
