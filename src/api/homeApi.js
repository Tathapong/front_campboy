import axios from "../config/axios";

export const getRandomCamp = () => axios.get("/home/get-random-camp");
export const getTopCamp = () => axios.get("/home/get-top-camp");
export const getMorePost = () => axios.get("/home/get-more-post");
export const getRecentReview = () => axios.get("/home/get-recent-review");
