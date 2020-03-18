const readline = require("readline");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const openEditor = require("open-editor");

const EDITOR_CMD = process.env.EDITOR || process.env.VISUAL || "vim";
const BLOG_DIR = path.resolve(__dirname, "..", "src", "blog");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

function createFileName(title) {
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
}

(async () => {
  let title;
  try {
    const question = "Hello, Mel. What would you like to write today?\ntitle> ";
    title = await ask(question);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  const fileName = createFileName(title);

  try {
    console.log(`Creating file: ${fileName}`);
    fs.writeFileSync(
      fileName,
      `---
title: ${title}
---`,
      { flag: "wx" }
    );
  } catch (e) {
    if (e.code === "EEXIST") {
      console.error("ERROR: File already exists!");
    } else {
      console.error(e);
    }
    process.exit(1);
  }

  try {
    console.log(`File created! Opening with editor...`);
    await openEditor([fileName]);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
