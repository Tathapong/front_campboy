import {
  NEWEST,
  OLDEST,
  HIGHEST_RATING,
  LOWEST_RATING,
  TOP_REVIEW,
  HIGHEST_LIKE,
  LOWEST_LIKE,
  RECENTS,
  TOP_PICK,
  FOLLOWING,
  SAVE
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
    else if (sortItem === HIGHEST_RATING) return orderByHighest(a.scores, b.scores, orderByNewest(a, b));
    else if (sortItem === LOWEST_RATING) return orderByLowest(a.scores, b.scores, orderByNewest(a, b));
    else if (sortItem === TOP_REVIEW)
      return orderByHighest(a.reviewCount, b.reviewCount, orderByHighest(a.scores, b.scores, orderByNewest(a, b)));
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
      return orderByHighest(a.commentLikeCount, b.commentLikeCount, orderByNewest(a, b));
    else if (sortItem === LOWEST_LIKE)
      return orderByLowest(a.commentLikeCount, b.commentLikeCount, orderByNewest(a, b));
  };
}

export function sortBlog(sortItem) {
  return function (a, b) {
    if (sortItem === RECENTS || sortItem === SAVE || sortItem === FOLLOWING) return orderByNewest(a, b);
    else if (sortItem === TOP_PICK)
      return orderByHighest(
        a.blogCommentCount,
        b.blogCommentCount,
        orderByHighest(a.blogLikeCount, b.blogLikeCount, orderByNewest(a, b))
      );
  };
}
