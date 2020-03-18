module.exports = function w3cDateFilter(value) {
  const dateObject = new Date(value);

  return dateObject.toISOString();
};
