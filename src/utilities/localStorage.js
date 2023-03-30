const ACCESS_TOKEN = "ACCESS_TOKEN";

export const getAccesToken = () => localStorage.getItem(ACCESS_TOKEN);
export const addAccesToken = (token) => localStorage.setItem(ACCESS_TOKEN, token);
export const removeAccesToken = () => localStorage.removeItem(ACCESS_TOKEN);
