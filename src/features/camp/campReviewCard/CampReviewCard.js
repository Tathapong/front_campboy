import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import StarRating from "../../../components/starRating/StarRating";

function CampReviewCard(props) {
  const { review } = props;
  const { User: user, summarize, reviewText, createdAt, rating } = review;

  const date = new Date(createdAt).toISOString().slice(0, 10);

  return (
    <div className="camp-review-card-group">
      <ProfileTitle name={`${user.firstName} ${user.lastName}`} profileImage={user.profileImage} />
      <div className="info-group">
        <div className="summarize">{summarize}</div>
        <div className="date">Reviewed {date}</div>
        <div className="overview-rating">
          <div className="title">Overall rating</div>
          <StarRating type={rating} />
        </div>
        <div className="review">
          <div className="title">Review</div>
          <div className="content">{reviewText}</div>
        </div>
      </div>
    </div>
  );
}

export default CampReviewCard;
