import background from "../../assets/images/background1.jpg";

import CampColumnCardList from "../../features/camp/campColumnCardList/CampColumnCardList";
import CardGroup from "../../components/cardGroup/CardGroup";
import SearchRandomCamp from "../../features/camp/searchRandomCamp/SearchRandomCamp";
import MorePost from "../../features/blog/morePost/MorePost";

import ReviewCardList from "../../features/camp/reviewCardList/ReviewCardList";

function Home() {
  return (
    <div className="home-page-container col-11">
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

export default Home;
