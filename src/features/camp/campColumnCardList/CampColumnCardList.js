import { memo } from "react";
import CampColumnCard from "../campColumnCard/CampColumnCard";

function CampColumnCardList(props) {
  const { campList } = props;

  return (
    <div className="camp-column-card-list-group">
      {campList.map((camp) => {
        return (
          <CampColumnCard
            key={camp.id}
            campId={camp.id}
            campName={camp.name}
            campImage={camp.campImage}
            campProvince={camp.provinceName}
            noReview={camp.reviewCount}
            averageRating={camp.averageRating}
          />
        );
      })}
    </div>
  );
}

export default memo(CampColumnCardList);
