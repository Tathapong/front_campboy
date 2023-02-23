import Header from "../layout/header/Header";
import background1 from "../assets/images/background1.jpg";

import "./page.css";
import CampColumnCardList from "../features/camp/campColumnCardList/CampColumnCardList";
import CardGroup from "../components/cardGroup/CardGroup";

function Home() {
  return (
    <div className="homeContainer">
      <Header></Header>

      <img src={background1} alt="background1" className="background1" />
      <CardGroup type="top-camp" header="Top Campgrounds">
        <CampColumnCardList />
      </CardGroup>
    </div>
  );
}

export default Home;
