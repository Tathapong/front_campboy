import { Link } from "react-router-dom";

import { capFirstLetter } from "../../../utilities/capFirstLetter";

import StarRating from "../../../components/starRating/StarRating";
import IconText from "../../../components/iconText/IconText";
import IconTextInfo from "../../../components/iconTextInfo/IconTextInfo";
import Button from "../../../components/button/Button";

function CampRowCard(props) {
  const { camp, setMapItem, mapItem } = props;

  const campId = camp.id;
  const coverImage = camp.CampImages[0].image;
  const rating = camp.OverallRating[0].rating;
  const reviewNo = camp.OverallRating[0].count;

  function onClickMapButton() {
    const existMap = mapItem.find((item) => item.id === camp.id);

    if (!existMap)
      setMapItem((prev) => [...prev, { lat: +camp.locationLat, lng: +camp.locationLng, id: camp.id, name: camp.name }]);
    else setMapItem((prev) => [...prev].filter((item) => item.id !== camp.id));
  }

  const isMap = mapItem.find((item) => item.id === camp.id);

  return (
    <div className="camp-row-card-group">
      <div className="image-group">
        <Link to={`/camp/${campId}`}>
          <img src={coverImage} alt="camp" className="image" />
        </Link>
      </div>

      <div className="info-group">
        <div className="camp-name-group">
          <Link className="camp-name" to={`/camp/${campId}`}>
            {camp.name}
          </Link>
          <Button className={isMap ? "btn-active" : ""} onClick={onClickMapButton}>
            <i class="fa-solid fa-map-pin icon" />
          </Button>
        </div>

        <div>
          <StarRating type={rating} />
          <span className="rating-count">({reviewNo})</span>
        </div>

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
