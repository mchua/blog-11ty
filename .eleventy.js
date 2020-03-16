const pluginSass = require("eleventy-plugin-sass");
const dateFilter = require("./src/filters/date-filter");
const permalinkFilter = require("./src/filters/permalink-filter");

module.exports = function(eleventyConfig) {
  // Eleventy setup
  eleventyConfig.setDataDeepMerge(true);

  // Filters
  eleventyConfig.addFilter("post_date", dateFilter);
  eleventyConfig.addFilter("post_permalink", permalinkFilter);

  // Layouts
  eleventyConfig.addLayoutAlias("default", "_layouts/default.njk");
  eleventyConfig.addLayoutAlias("post", "_layouts/post.njk");

  // Collections
  eleventyConfig.addCollection("posts", collection => {
    return collection.getFilteredByGlob(["src/blog/*.md", "src/blog/*.html"]);
  });

  eleventyConfig.addCollection("postsByYear", collection => {
    const posts = collection.getFilteredByGlob([
      "src/blog/*.md",
      "src/blog/*.html"
    ]);

    const postMap = {};
    posts.forEach(post => {
      const year = post.date.getFullYear();
      // Initialize year
      postMap[year] = postMap[year] || [];
      // Add post to year
      postMap[year].push(post);
    });

    return {
      years: Object.keys(postMap),
      postMap: postMap
    };
  });

  // Assets
  eleventyConfig.addPassthroughCopy("assets");

  // Plugins
  eleventyConfig.addPlugin(pluginSass, {
    watch: ["src/css/**/*.scss", "!node_modules/**"]
  });

  return {
    dir: {
      input: "./src",
      output: "./_site"
    }
  };
};
