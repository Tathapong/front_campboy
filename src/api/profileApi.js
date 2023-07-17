import axios from "../config/axios";

export const getProfileById = (profileId) => axios.get("/profile/" + profileId);
export const updateProfile = (formData) => axios.patch("/profile", formData);
export const toggleFollow = (profileId) => axios.post("/profile/" + profileId);

export const getAccountListTopWriter = () => axios.get("/profile/follow/topWriter");
