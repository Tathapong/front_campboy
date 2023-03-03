import "./starRating.css";
function StarRating(props) {
  const { type = 5 } = props;
  const star = [];

  if ([0, 1, 2, 3, 4, 5].includes(+type)) {
    for (let i = 0; i < 5; i++) {
      star[i] = i + 1 <= type ? <i className="fa-solid fa-star" /> : <i className="fa-regular fa-star" />;
    }
  } else {
    for (let i = 0; i < 5; i++) {
      star[i] = <i className="fa-solid fa-star" />;
    }
  }

  return <span className="star-rating-group">{star}</span>;
}

export default StarRating;
