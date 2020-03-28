# SymptoTrack

SymptoTrack is Hike's started pack for websites using WordPress Headless, Next.js, React, GraphQL and the Rest API.

# Requirements

There are a couple of things you will need to have installed within your working environment before you can start working with SymptoTrack.

- [Node.JS](https://nodejs.org/en/) you can use the installer on the Node website to install

---

# Frontend Development

Within the src/ directory are a few subdirectories, we'll explain more about these and everything else.

## JavaScript

Our entire frontend is built in React, which is a JavaScript UI Framework. It allows you to write in JSX, which is a JavaScript syntax very similar to HTML but enhanced with the lovely features of JavaScript. JSX should preferrably only ever be written inside .jsx files, not .js files. This way, you can look at the name and extension of a file and have a suggestion about it's contents.

## Styled Components

We'll be using styled components to style our components. It's a CSS-in-JS solution that's very popular right now.

## Next.js

We'll be using Next.js to get our React code to be able to render server-side. This way we'll have the first render on the server. Which is good for Accessibility, SEO and Performance.

---

# Environment variables

In order to make your project work correctly on Forest you need to set some environment variables in your Forest project.

- **NODE_ENV** This variable is used by Next.js to start in development or production mode.
- **ENV** This variable is used in the _theme.config.js_ file to get the correct baseUrl.
- **PORT** This variable is used in the _server.js_ file to set the port. _Default: 80_

---

## Documentation

SymptoTrack uses a couple of awesome high-end techniques and various cool implementations. Here you will find a list of links to the documentation of each tool.

- [Node Package Manager](https://docs.npmjs.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Next.js](https://nextjs.org/)

---
