import axios from "../config/axios";
export const signup = ({ firstName, lastName, email, password, confirmPassword }) =>
  axios.post("/auth/signup", { firstName, lastName, email, password, confirmPassword });
export const login = ({ email, password }) => axios.post("auth/login", { email, password });
export const getMe = () => axios.get("/auth/me");
export const changePassword = ({ oldPassword, newPassword, confirmPassword }) =>
  axios.patch("auth/changepassword", { oldPassword, newPassword, confirmPassword });
