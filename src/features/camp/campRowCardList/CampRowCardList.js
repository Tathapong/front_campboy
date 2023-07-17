import { memo } from "react";

import CampRowCard from "../campRowCard/CampRowCard";

function CampRowCardList(props) {
  const { campList, setMapItem, mapItem } = props;
  return (
    <div className="camp-row-card-list-group">
      {campList.map((item) => {
        return (
          <CampRowCard
            key={item.id}
            camp={item}
            isMap={mapItem.find((map) => map.id === item.id)}
            setMapItem={setMapItem}
          />
        );
      })}
    </div>
  );
}

export default memo(CampRowCardList);
