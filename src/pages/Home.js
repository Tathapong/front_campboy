import Header from "../layout/header/Header";
import background1 from "../assets/images/background1.jpg";

import "./page.css";

function Home() {
  return (
    <div className="homeContainer">
      <Header></Header>
      <img src={background1} alt="background1" className="background1" />
    </div>
  );
}

export default Home;
