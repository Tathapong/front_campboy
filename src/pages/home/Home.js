import background from "../../assets/images/background1.jpg";

import CampColumnCardList from "../../features/camp/campColumnCardList/CampColumnCardList";
import CardGroup from "../../components/cardGroup/CardGroup";
import CampSearch from "../../features/camp/campSearch/CampSearch";
import BlogCardAList from "../../features/blog/blogCardList/BlogCardAList";

import ReviewCardList from "../../features/camp/reviewCardList/ReviewCardList";

function Home() {
  return (
    <div className="home-page-container col-11">
      <img src={background} alt="background" className="image-background" />
      <CampSearch />

      <CardGroup className="card-group-top-camp" header="Top Campgrounds">
        <CampColumnCardList />
      </CardGroup>

      <CardGroup className="card-group-more-post" header="More Posts">
        <BlogCardAList />
      </CardGroup>

      <CardGroup className="card-group-recent-review" header="Recent Reviews">
        <ReviewCardList />
      </CardGroup>
    </div>
  );
}

export default Home;
