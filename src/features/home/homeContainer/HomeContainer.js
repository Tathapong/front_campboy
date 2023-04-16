import CampColumnCardList from "../../camp/campColumnCardList/CampColumnCardList";
import CardGroup from "../../../components/cardGroup/CardGroup";
import SearchRandomCamp from "../../camp/searchRandomCamp/SearchRandomCamp";
import MorePost from "../../blog/morePost/MorePost";
import RecentReviewList from "../../camp/recentReviewList/RecentReviewList";

function HomeContainer() {
  return (
    <div className="home-container col-11">
      <img
        src="https://res.cloudinary.com/duzw1g3u8/image/upload/v1679642103/Campboy/assets/background1_w2hz9a.jpg"
        alt="background"
        className="image-background"
      />
      <SearchRandomCamp />

      <CardGroup className="card-group-top-camp" header="Top Campgrounds">
        <CampColumnCardList />
      </CardGroup>

      <CardGroup className="card-group-more-post" header="More Posts">
        <MorePost />
      </CardGroup>

      <CardGroup className="card-group-recent-review" header="Recent Reviews">
        <RecentReviewList />
      </CardGroup>
    </div>
  );
}

export default HomeContainer;
