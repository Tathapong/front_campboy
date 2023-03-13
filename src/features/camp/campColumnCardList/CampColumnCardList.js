// import "./campColumnCardList.css";
import camp1 from "../../../assets/images/camp1.jpg";
import camp2 from "../../../assets/images/camp2.jpg";
import camp3 from "../../../assets/images/camp3.jpg";
import camp4 from "../../../assets/images/camp4.jpg";

import CampColumnCard from "../campColumnCard/CampColumnCard";

function CampColumnCardList() {
  const topCamp = [
    { province: "Nakhonnayok", campName: "Nakhonnayok Camp", noReview: "42", image: camp1 },
    { province: "Saraburi", campName: "Saraburi Camp", noReview: "102", image: camp2 },
    { province: "Phetburi", campName: "Phetburi Camp", noReview: "12", image: camp3 },
    { province: "Kanchanaburi", campName: "Kanchanaburi Camp", noReview: "422", image: camp4 }
  ];
  return (
    <div className="camp-column-card-list-group">
      {topCamp.map((item) => {
        return (
          <CampColumnCard
            province={item.province}
            campName={item.campName}
            noReview={item.noReview}
            image={item.image}
          />
        );
      })}
    </div>
  );
}

export default CampColumnCardList;
