import axios from "../config/axios";

export const uploadImage = (formData) => axios.post("/blog/create/image-upload", formData);
export const createBlog = (inputData) => axios.post("/blog/create/post", inputData);
export const getAllBlog = () => axios.get("/blog");
export const getBlogById = (blogId) => axios.get("/blog/" + blogId);
