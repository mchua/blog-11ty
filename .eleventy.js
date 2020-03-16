const pluginSass = require("eleventy-plugin-sass");

// Don't need a lib for this, y'all.</snark>
const leftpad = str => `00${str}`.slice(-2);

module.exports = function(eleventyConfig) {
  // Filters
  eleventyConfig.addFilter("post_permalink", page => {
    const year = page.date.getFullYear();
    const month = leftpad(page.date.getMonth() + 1);
    const day = leftpad(page.date.getDate());
    return `${year}/${month}/${day}/${page.fileSlug}/`;
  });

  // Layouts
  eleventyConfig.addLayoutAlias("default", "_layouts/default.njk");
  eleventyConfig.addLayoutAlias("post", "_layouts/post.njk");
  eleventyConfig.addLayoutAlias("home", "_layouts/home.njk");

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
