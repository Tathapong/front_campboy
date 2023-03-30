import CampRowCard from "../campRowCard/CampRowCard";

function CampRowCardList(props) {
  const { campList } = props;
  return (
    <div className="camp-row-card-list-group">
      {campList.map((item) => {
        return <CampRowCard key={item.id} camp={item} />;
      })}
    </div>
  );
}

export default CampRowCardList;
