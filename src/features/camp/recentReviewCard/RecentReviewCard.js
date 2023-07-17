import { Link } from "react-router-dom";

import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import StarRating from "../../../components/starRating/StarRating";

function RecentReviewCard(props) {
  const { review } = props;

  const date = new Date(review.createdAt).toUTCString().slice(5, 16);

  return (
    <div className="recent-review-card-group">
      <Link className="province" to="/findacamp" state={{ provinceFilter: review.provinceId ?? null }}>
        {review.provinceName}
      </Link>
      <div className="title">
        <Link className="camp-name" to={`/camp/${review.campId}`}>
          {review.campName}
        </Link>
        <span className="date">{date}</span>
      </div>
      <div className="summarize">{review.summarize}</div>
      <StarRating type={review.rating} />
      <div
        className="review"
        dangerouslySetInnerHTML={{ __html: JSON.parse(review.reviewText).replace(/\n/g, "<br>") }}
      ></div>
      <ProfileTitle name={review.profileName} profileImage={review.profileImage} to={`/profile/${review.profileId}`} />
    </div>
  );
}

export default RecentReviewCard;
