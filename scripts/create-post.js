const readline = require("readline");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");

const BLOG_DIR = path.resolve(__dirname, "..", "src", "blog");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = "Hello, Mel. What would you like to write today?\ntitle> ";
rl.question(question, title => {
  const fileName = createFileName(title);
  console.log(`Creating file: ${fileName}`);
  fs.writeFileSync(
    fileName,
    `---
title: ${title}
---`
  );
  console.log("File created!");
  rl.close();
});

const createFileName = title => {
  // Don't need a lib for this, y'all.
  const leftpad = str => `00${str}`.slice(-2);

  const date = new Date();
  const year = date.getFullYear();
  const month = leftpad(date.getMonth() + 1);
  const day = leftpad(date.getDate());
  const slug = slugify(title, {
    replacement: "-",
    lower: true
  });
  return `${BLOG_DIR}/${year}-${month}-${day}-${slug}.md`;
};
