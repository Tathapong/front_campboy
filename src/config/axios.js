import axios from "axios";
import { getAccesToken, removeAccesToken } from "../utilities/localStorage";
import { API_ENDPOINT_URL } from "./env";

axios.defaults.baseURL = API_ENDPOINT_URL;
axios.interceptors.request.use(
  (config) => {
    const token = getAccesToken();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status === 401) {
      removeAccesToken();
      window.location.replace("/");
    }

    return Promise.reject(err);
  }
);

export default axios;
