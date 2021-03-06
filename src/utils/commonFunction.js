export const arrayToObject = (array) => {
  return array.reduce((obj, item) => {
    if (item.id) {
      obj[item.id] = item;
    } else {
      obj[item.course.id] = item;
    }
    return obj;
  }, {});
};
