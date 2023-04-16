function StarRatingForm(props) {
  const { type, onClick } = props;
  const star = [];

  for (let i = 0; i < 5; i++) {
    star[i] =
      i + 1 <= type ? (
        <i className="fa-solid fa-star" key={i} onClick={() => onClick(i + 1)} />
      ) : (
        <i className="fa-regular fa-star" key={i} onClick={() => onClick(i + 1)} />
      );
  }

  return <span className="star-rating-form">{star}</span>;
}

export default StarRatingForm;
