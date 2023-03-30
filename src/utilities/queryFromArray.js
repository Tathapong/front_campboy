export const queryFromArray = function (name, list) {
  const arr = list.map((item) => `${name}[]=${item}`);
  return arr.join("&");
};
