const fs = require("fs");
const pluginSass = require("eleventy-plugin-sass");
const dateFilter = require("./src/filters/date-filter");
const permalinkFilter = require("./src/filters/permalink-filter");
const paginationFilter = require("./src/filters/pagination-filter");
const w3cDateFilter = require("./src/filters/w3c-date-filter");
const minifyHTML = require("./src/transforms/minify-html");

module.exports = function(eleventyConfig) {
  // Eleventy setup
  eleventyConfig.setDataDeepMerge(true);

  // Filters
  eleventyConfig.addFilter("post_date", dateFilter);
  eleventyConfig.addFilter("post_permalink", permalinkFilter);
  eleventyConfig.addFilter("pagination_pages", paginationFilter);
  eleventyConfig.addFilter("w3c_date", w3cDateFilter);

  // Transforms
  eleventyConfig.addTransform("htmlmin", minifyHTML);

  // Layouts
  // Support old post frontmatter without having to do a giant find/replace
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

  // Markdown engine
  const markdownIt = require("markdown-it");
  // For embedding YouTube/Vimeo etc.
  // https://www.npmjs.com/package/markdown-it-block-embed
  const markdownItBlockEmbed = require("markdown-it-block-embed");
  const options = {
    html: true
  };
  const markdownLib = markdownIt(options).use(markdownItBlockEmbed);
  eleventyConfig.setLibrary("md", markdownLib);

  // 404
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: (err, browserSync) => {
        const notFoundPage = fs.readFileSync("_site/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(notFoundPage);
          res.end();
        });
      }
    }
  });

  return {
    dir: {
      input: "./src",
      output: "./_site"
    }
  };
};
