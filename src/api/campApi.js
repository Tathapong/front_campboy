import axios from "../config/axios";
export const getCampById = (campId) => axios.get(`/camp/${campId}`);
export const getAllCamp = (query = "") => axios.get("/camp" + query);
