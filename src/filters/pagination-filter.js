const PAGE_RANGE = 2;
const PAGE_MARGINS = 1;

/**
 * Returns an array of page indices (0-based) or -1s.
 *
 * For -1, you should render an "...".
 *
 * Shape of `pagination` object here:
 * https://www.11ty.dev/docs/pagination/#paging-an-array
 */
module.exports = pagination => {
  const numPages = pagination.pages.length;
  const currentPage = pagination.pageNumber;
  const pageNumbers = [];

  // Base case
  if (numPages <= PAGE_RANGE * 2) {
    for (let index = 0; index < numPages; index++) {
      pageNumbers.push(index);
    }
    return pageNumbers;
  }

  for (let index = 0; index < numPages; index++) {
    if (index < PAGE_MARGINS) {
      pageNumbers.push(index);
    } else if (index >= numPages - PAGE_MARGINS) {
      pageNumbers.push(index);
    } else if (Math.abs(currentPage - index) <= PAGE_RANGE) {
      pageNumbers.push(index);
    } else if (pageNumbers[pageNumbers.length - 1] !== -1) {
      pageNumbers.push(-1);
    }
  }

  return pageNumbers;
};
