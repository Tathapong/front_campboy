import CampRowCard from "../campRowCard/CampRowCard";

function CampRowCardList(props) {
  const { campList } = props;
  return (
    <div className="camp-row-card-list-group">
      {campList.map((item) => {
        return (
          <CampRowCard
            campName={item.camp}
            province={item.province}
            star="5"
            price="250"
            campImage={item.images[0]}
            key={item.id}
            campId={item.id}
            services={item.information["สิ่งอำนวยความสะดวก"]}
          />
        );
      })}
    </div>
  );
}

export default CampRowCardList;
