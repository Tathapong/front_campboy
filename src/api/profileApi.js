import axios from "../config/axios";
export const getProfileById = (profileId) => axios.get("/profile/" + profileId);
