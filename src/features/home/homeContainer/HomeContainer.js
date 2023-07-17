import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CampColumnCardList from "../../camp/campColumnCardList/CampColumnCardList";
import CardGroup from "../../../components/cardGroup/CardGroup";

import MorePost from "../../blog/morePost/MorePost";
import RecentReviewList from "../../camp/recentReviewList/RecentReviewList";
import SearchRandomCamp from "../../camp/searchRandomCamp/SearchRandomCamp";

import {
  thunk_getTopCamps,
  thunk_getMorePosts,
  thunk_getRecentReviews,
  selectTopCamps,
  selectMorePost,
  selectRecentReview
} from "../../../stores/homeSlice";

function HomeContainer() {
  const dispatch = useDispatch();
  const topCamp = useSelector(selectTopCamps);
  const morePost = useSelector(selectMorePost);
  const recentReviews = useSelector(selectRecentReview);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(thunk_getTopCamps());
        await dispatch(thunk_getMorePosts());
        await dispatch(thunk_getRecentReviews());
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [dispatch]);
  return (
    <div className="home-container col-11">
      <img
        src="https://res.cloudinary.com/duzw1g3u8/image/upload/v1679642103/Campboy/assets/background1_w2hz9a.jpg"
        alt="background"
        className="image-background"
      />
      <SearchRandomCamp />

      <CardGroup className="card-group-top-camp" header="Top Campgrounds">
        <CampColumnCardList campList={topCamp} />
      </CardGroup>

      <CardGroup className="card-group-more-post" header="More Posts">
        <MorePost morePost={morePost} />
      </CardGroup>

      {recentReviews.length ? (
        <CardGroup className="card-group-recent-review" header="Recent Reviews">
          <RecentReviewList reviewList={recentReviews} />
        </CardGroup>
      ) : (
        ""
      )}
    </div>
  );
}

export default HomeContainer;
