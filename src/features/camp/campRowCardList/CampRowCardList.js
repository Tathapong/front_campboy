import CampRowCard from "../campRowCard/CampRowCard";
import "./campRowCardList.css";

function CampRowCardList(props) {
  const { campList } = props;
  return (
    <div className="camp-row-card-list-group">
      {campList.map((item) => {
        return <CampRowCard campName={item.camp} province={item.province} star="5" price="250" />;
      })}
    </div>
  );
}

export default CampRowCardList;
