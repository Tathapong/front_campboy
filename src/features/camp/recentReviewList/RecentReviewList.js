import RecentReviewCard from "../recentReviewCard/RecentReviewCard";

function RecentReviewList(props) {
  const { reviewList } = props;

  return (
    <div className="recent-review-card-list-group">
      {reviewList.map((review) => (
        <RecentReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}

export default RecentReviewList;
