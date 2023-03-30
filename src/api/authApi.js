import axios from "../config/axios";
export const signup = ({ firstName, lastName, emailOrMobile, password, confirmPassword }) =>
  axios.post("/auth/signup", { firstName, lastName, emailOrMobile, password, confirmPassword });
export const login = ({ emailOrMobile, password }) => axios.post("auth/login", { emailOrMobile, password });
export const getMe = () => axios.get("/auth/me");
export const changePassword = ({ oldPassword, newPassword, confirmPassword }) =>
  axios.patch("auth/changepassword", { oldPassword, newPassword, confirmPassword });
