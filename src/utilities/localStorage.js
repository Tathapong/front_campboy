const ACCESS_TOKEN = "ACCESS_TOKEN";
const RESEND_EMAIL = "RESEND_EMAIL";

export const getAccesToken = () => localStorage.getItem(ACCESS_TOKEN);
export const addAccesToken = (token) => localStorage.setItem(ACCESS_TOKEN, token);
export const removeAccesToken = () => localStorage.removeItem(ACCESS_TOKEN);

export const getResendEmail = () => localStorage.getItem(RESEND_EMAIL);
export const addResendEmail = (email) => localStorage.setItem(RESEND_EMAIL, email);
export const removeResendEmail = () => localStorage.removeItem(RESEND_EMAIL);
