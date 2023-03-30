export const checkboxFromArray = function (list) {
  return list.map((item) => {
    return { id: item.id, label: item.title, value: item.id };
  });
};
