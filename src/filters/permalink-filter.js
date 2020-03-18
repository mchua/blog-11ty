// Don't need a lib for this, y'all.
const leftpad = str => `00${str}`.slice(-2);

module.exports = function permalinkFilter(page) {
  const year = page.date.getFullYear();
  const month = leftpad(page.date.getMonth() + 1);
  const day = leftpad(page.date.getDate());
  return `${year}/${month}/${day}/${page.fileSlug}`;
};
