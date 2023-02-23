import "./campColumnCardList.css";
import camp1 from "../../../assets/images/camp1.jpg";
import camp2 from "../../../assets/images/camp2.jpg";
import camp3 from "../../../assets/images/camp3.jpg";
import camp4 from "../../../assets/images/camp4.jpg";

import CampColumnCard from "../campColumnCard/CampColumnCard";

function CampColumnCardList() {
  return (
    <div className="camp-column-card-list-group">
      <CampColumnCard province="Nakhonnayok" campName="Nakhonnayok Camp" noReview="42" image={camp1} />
      <CampColumnCard province="Saraburi" campName="Saraburi Camp" noReview="102" image={camp2} />
      <CampColumnCard province="Phetburi" campName="Phetburi Camp" noReview="12" image={camp3} />
      <CampColumnCard province="Kanchanaburi" campName="Kanchanaburi Camp" noReview="422" image={camp4} />
    </div>
  );
}

export default CampColumnCardList;
