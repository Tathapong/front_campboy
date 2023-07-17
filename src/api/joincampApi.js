import axios from "../config/axios";

export const createJoincamp = (input) => axios.post("/joincamp", input);
