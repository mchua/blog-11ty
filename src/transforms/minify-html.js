const htmlmin = require("html-minifier");

module.exports = function minifyHTML(value, outputPath) {
  if (!outputPath.endsWith(".html")) {
    return value;
  }

  return htmlmin.minify(value, {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true
  });
};
