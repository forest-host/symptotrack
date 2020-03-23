# Glamrock

Glamrock is Hike's started pack for websites using WordPress Headless, Next.js, React, GraphQL and the Rest API.

## Backend

The WordPress backend can be found in: /backend/.
See the Readme in the backend/ dir for more information.

## Working with Glamrock

Glamrock consists of two services you'll be working with: backend (WordPress), frontend (Next, React).
To work locally with Glamrock we advise running the Composer development script first. This enables you to work inside the repo without having to copy around changes or setting up your own environment.
After installing run:

```bash
# Set up Glamrock for local development (after installing)
cd backend && composer run-script development
```

Point your favorite server (nginx, valet, whatever-tool-you-use) to backend/wordpress/ or symlink this folder in your favorite server.

This enables you to always work within the repo following this structure:

- backend/wp-content = your place to do stuff (making themes, plugins or other custom stuff you want to have happening in your wp-content)
- backend/wp-config.php = general wp-config. We can advise working with local environment variables and not change the file

Dont work in any of these directories:

- backend/wordpress/
- backend/vendor/

---

# Requirements

There are a couple of things you will need to have installed within your working environment before you can start working with Glamrock.

- [Node.JS](https://nodejs.org/en/) you can use the installer on the Node website to install
- [Composer](https://getcomposer.org/) Follow install instructions

---

# Starting a project

In the place where you want to keep your projects, do the following

```bash
# clone repository
git clone git@bitbucket.org:gohike/glamrock.git ./
# navigate into the project
cd glamrock
# Install the backend & dependencies (this includes WordPress)
cd backend &&  composer install
# Install the frontend & dependencies (Next.js)
cd front-end && npm install
```

then symlink the wordpress/ directory created in the project root to a location hosted by your local server.
For nginx this would most likely be: `/var/www/`.
If you're using Laravel's `valet` this will likely be `~/Sites/`.
Don't forget to rename the wordpress directory to a name of your choice when symlinking.

You should now be ready to set up the WordPress install through their 5-minute installer.
Activate the headless theme and you should be ready to start working on the backend.

To start developing for the frontend, go into the frontend/ directory of the project and run `npm start`.
It's possible to use yarn instead, but please don't mix npm and yarn.

<!-- Update the database settings in ``wordpress/wp-config.php`` and you are good to go. -->

---

# Backend Development

## Functions

The main power of the WordPress theme can be found inside the functions/ directory of the theme. Here you can add filters and stuff.

## ACF

Inside the theme is an acf/ directory. Here you can and should register all your ACF fields. This is where the main content will live!

## GraphQL

### Pagination

Be default WPGraphQL doesn't support pagination. To make it work you need to include `graphql/pagination.php` file. (it's not included by default because it slows down the graphgql queries)

With this file included, you can use the following:

```
query GET_POSTS($page: Int!, $per_page: Int!) {
  posts(where: {offsetPagination: {page: $page, per_page: $per_page}}) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      previousPage
      nextPage
      totalPages
    }
    edges {
      cursor
      node {
        id
        title
        uri
      }
    }
  }
}
```

### Meta query filtering

By default meta query doesn't work. There is a [plugin](https://github.com/wp-graphql/wp-graphql-meta-query) which makes it work but it's not recommended to install that because it slows down the graphql work, what we have to do it's just to "steal" a code from that plugin and adjust the code to use only that types and comparisons which we expect we'll use in a theme. See example in `graphql/meta-query.php`

---

# Frontend Development

Within the frontend/ directory are a few subdirectories, we'll explain more about these and everything else.

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

Glamrock uses a couple of awesome high-end techniques and various cool implementations. Here you will find a list of links to the documentation of each tool.

- [WordPress Codex](http://codex.wordpress.org/)
- [Node Package Manager](https://docs.npmjs.com/)

Besides Glamrock implemenations, here you will find a list of trusted WordPress implementations we use in about every project.

- [Advanced Custom Fields](http://www.advancedcustomfields.com/resources/)
- [Gravity Forms](https://www.gravityhelp.com/documentation/)

---
