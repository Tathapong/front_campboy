import CampRowCard from "../campRowCard/CampRowCard";

function CampRowCardList(props) {
  const { campList, setMapItem, mapItem } = props;
  return (
    <div className="camp-row-card-list-group">
      {campList.map((item) => {
        return <CampRowCard key={item.id} camp={item} setMapItem={setMapItem} mapItem={mapItem} />;
      })}
    </div>
  );
}

export default CampRowCardList;
