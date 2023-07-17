import axios from "../config/axios";

export const getCampById = (campId) => axios.get(`/camp/${campId}`);
export const getAllCamp = (query = "") => axios.get("/camp" + query);
export const writeReview = ({ rating, summarize, reviewText, campId }) =>
  axios.post("/camp/review", { rating, summarize, reviewText, campId });
export const updateReview = ({ rating, summarize, reviewText, reviewId }) =>
  axios.put("/camp/review/" + reviewId, { rating, summarize, reviewText });
export const deleteReview = (reviewId) => axios.delete("/camp/review/" + reviewId);
