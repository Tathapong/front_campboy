import { Link } from "react-router-dom";
import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import StarRating from "../../../components/starRating/StarRating";

function RecentReviewCard() {
  return (
    <div className="recent-review-card-group">
      <Link className="province">Nakhonnayok</Link>
      <div className="title">
        <Link className="camp-name">Nakhonnayok camp</Link>
        <span className="date">Feb 09, 2023</span>
      </div>
      <div className="summarize">"Breathtaking views!!"</div>
      <Link className="content">
        <StarRating />
        <div className="review">
          We drove in on 525 from 89A for about 5.7 miles, as we knew we were staying for 2 weeks. We took it slow and
          our Fifth wheel did not suffer. You did not need high clearance to be on 525. If you took any of the OHV
          roads, you definitely did. We actually set up our RV in one site and then drove farther down the road and
          located a much better site with
        </div>
      </Link>
      <ProfileTitle name="john mayer" />
    </div>
  );
}

export default RecentReviewCard;
