import axios from "../config/axios";

export const uploadImage = (formData) => axios.post("/blog/create/image-upload", formData);

export const createBlog = (inputData) => axios.post("/blog/create/post", inputData);
export const updateBlog = ({ title, rawContentState, featureImage, blogId }) =>
  axios.put("/blog/" + blogId, { title, rawContentState, featureImage });
export const deleteBlog = (blogId) => axios.delete("/blog/" + blogId);

export const getAllBlog = () => axios.get("/blog");
export const getBlogById = (blogId) => axios.get("/blog/" + blogId);

export const toggleSave = (blogId) => axios.post(`/blog/${blogId}/save`);
export const toggleLike = (blogId) => axios.post(`/blog/${blogId}/like`);
export const toggleCommentLike = (commentId) => axios.post(`/comment/${commentId}`);

export const createComment = ({ blogId, title }) => axios.post(`/blog/${blogId}/comment`, { title });
export const deleteComment = ({ blogId, commentId }) => axios.delete(`/blog/${blogId}/comment/${commentId}`);
export const updateComment = ({ blogId, commentId, title }) =>
  axios.patch(`/blog/${blogId}/comment/${commentId}`, { title });
