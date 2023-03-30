import capFirstLetter from "./capFirstLetter";

export const selectboxFromArray = function (list) {
  return list.map((item) => {
    return { id: item.id, name: capFirstLetter(item.name), value: item.value };
  });
};
