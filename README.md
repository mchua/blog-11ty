# blog-11ty

11ty implementation of blog, with thanks to David Peter

## Setup

`git` knowledge and a `node`/`npm` installation is assumed.

First, clone this repository from GitHub. Next, you'll need to install this project's third-party dependencies in order to build this project locally. In your terminal, navigate to the folder for the cloned project, and run:

```bash
npm install
```

This should install all the packages for you (in `node_modules/`). Installing packages are a pre-requisite for running commands.

## Common commands

- `npm run dev`: Starts the 11ty development server. Use this to preview your whole site before pushing to production. It hot-reloads!

## Gotchas

- On the development server, old pages are retained, not removed. So if something feels off, try removing the generated `_sites/` folder and re-running `npm run dev` and see if the problem persists.
- Changing code for filters needs a complete restart of `npm run dev`.
- Basically turn `npm run dev` off and on again if something seems wrong.
