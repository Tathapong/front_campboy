import axios from "../config/axios";

export const signup = ({ firstName, lastName, email, password, confirmPassword }) =>
  axios.post("/auth/signup", { firstName, lastName, email, password, confirmPassword });
export const login = ({ email, password }) => axios.post("auth/login", { email, password });
export const getMe = () => axios.get("/auth/me");
export const changePassword = ({ oldPassword, newPassword, confirmPassword }) =>
  axios.patch("auth/change-password", { oldPassword, newPassword, confirmPassword });

export const sendEmail = ({ email, type }) => axios.post("/auth/send-email", { email, type });
export const verifyEmail = ({ userId, hashedToken }) => axios.get(`/auth/users/${userId}/verify/${hashedToken}`);

export const verifyLink = ({ userId, hashedToken }) => axios.get(`/auth/users/${userId}/reset-password/${hashedToken}`);
export const resetPassword = ({ userId, hashedToken, newPassword, confirmPassword }) =>
  axios.post(`/auth/users/${userId}/reset-password/${hashedToken}`, { newPassword, confirmPassword });
