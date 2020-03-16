const pluginSass = require("eleventy-plugin-sass");

module.exports = function(eleventyConfig) {
  // Layouts
  eleventyConfig.addLayoutAlias("default", "_layouts/default.njk");
  eleventyConfig.addLayoutAlias("post", "_layouts/post.njk");
  eleventyConfig.addLayoutAlias("home", "_layouts/home.njk");

  // Collections
  eleventyConfig.addCollection("posts", collection => {
    return collection.getFilteredByGlob(["_posts/*.md", "_posts/*.html"]);
  });

  eleventyConfig.addCollection("postsByYear", collection => {
    const posts = collection.getFilteredByGlob([
      "_posts/*.md",
      "_posts/*.html"
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
    watch: ["css/**/*.scss", "!node_modules/**"]
  });

  return {
    dir: {
      input: "./",
      output: "./_site"
    }
  };
};
