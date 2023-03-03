import "./reviewCardList.css";
import ReviewCard from "../reveiwCard/ReviewCard";

function ReviewCardList() {
  return (
    <div className="review-card-list-group">
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
    </div>
  );
}

export default ReviewCardList;
