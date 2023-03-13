import background from "../../../assets/images/background1.jpg";

import CampColumnCardList from "../../camp/campColumnCardList/CampColumnCardList";
import CardGroup from "../../../components/cardGroup/CardGroup";
import SearchRandomCamp from "../../camp/searchRandomCamp/SearchRandomCamp";
import MorePost from "../../blog/morePost/MorePost";
import ReviewCardList from "../../camp/reviewCardList/ReviewCardList";

function HomeContainer() {
  return (
    <div className="home-container col-11">
      <img src={background} alt="background" className="image-background" />
      <SearchRandomCamp />

      <CardGroup className="card-group-top-camp" header="Top Campgrounds">
        <CampColumnCardList />
      </CardGroup>

      <CardGroup className="card-group-more-post" header="More Posts">
        <MorePost />
      </CardGroup>

      <CardGroup className="card-group-recent-review" header="Recent Reviews">
        <ReviewCardList />
      </CardGroup>
    </div>
  );
}

export default HomeContainer;
