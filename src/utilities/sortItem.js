import {
  NEWEST,
  OLDEST,
  HIGHEST_RATING,
  LOWEST_RATING,
  TOP_REVIEW,
  HIGHEST_LIKE,
  LOWEST_LIKE
} from "../constants/constant";

function orderByNewest(a, b) {
  if (a.createdAt > b.createdAt) return -1;
  else if (a.createdAt === b.createdAt) return 0;
  else return 1;
}
function orderByOldest(a, b) {
  if (a.createdAt > b.createdAt) return 1;
  else if (a.createdAt === b.createdAt) return 0;
  else return -1;
}

function orderByHighest(a, b, sortFn) {
  if (a > b) return -1;
  else if (a === b) return sortFn;
  else return 1;
}
function orderByLowest(a, b, sortFn) {
  if (a > b) return 1;
  else if (a === b) return sortFn;
  else return -1;
}

export function sortCamp(sortItem) {
  return function (a, b) {
    if (sortItem === NEWEST) return orderByNewest(a, b);
    else if (sortItem === OLDEST) return orderByOldest(a, b);
    else if (sortItem === HIGHEST_RATING)
      return orderByHighest(a.OverallRating[0].rating, b.OverallRating[0].rating, orderByNewest(a, b));
    else if (sortItem === LOWEST_RATING)
      return orderByLowest(a.OverallRating[0].rating, b.OverallRating[0].rating, orderByNewest(a, b));
    else if (sortItem === TOP_REVIEW)
      return orderByHighest(
        a.OverallRating[0].count,
        b.OverallRating[0].count,
        orderByHighest(a.OverallRating[0].rating, b.OverallRating[0].rating, orderByNewest(a, b))
      );
  };
}

export function sortReview(sortItem) {
  return function (a, b) {
    if (sortItem === NEWEST) return orderByNewest(a, b);
    else if (sortItem === OLDEST) return orderByOldest(a, b);
    else if (sortItem === HIGHEST_RATING) return orderByHighest(a.rating, b.rating, orderByNewest(a, b));
    else if (sortItem === LOWEST_RATING) return orderByLowest(a.rating, b.rating, orderByNewest(a, b));
  };
}

export function sortComment(sortItem) {
  return function (a, b) {
    if (sortItem === NEWEST) return orderByNewest(a, b);
    else if (sortItem === OLDEST) return orderByOldest(a, b);
    else if (sortItem === HIGHEST_LIKE)
      return orderByHighest(a.CommentLikes.length, b.CommentLikes.length, orderByNewest(a, b));
    else if (sortItem === LOWEST_LIKE)
      return orderByLowest(a.CommentLikes.length, b.CommentLikes.length, orderByNewest(a, b));
  };
}
