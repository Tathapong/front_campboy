import validator from "validator";

export const isNotEmpty = (input) => input && input.trim();
export const isEmail = (input) => validator.isEmail(input);
export const isStrongPassword = (input) => validator.isStrongPassword(input);
