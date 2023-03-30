import axios from "../config/axios";

export const getProvince = async () => {
  const res = await axios.get("/api/resources/provinces");
  const { provinces } = res.data;
  return provinces;
};

export const getFilterList = async () => {
  const res = await axios.get("/api/resources/filtercheckboxs");
  const { filterCheckboxs } = res.data;
  return filterCheckboxs;
};
