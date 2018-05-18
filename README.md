# photoApp

## Table of contents
* [Description](#user-content-what-is-this)
* [Features](#user-content-features)
* [Next features](#user-content-next-features)
* [Setup](#user-content-setup)
* [Running in dev mode](#user-content-running-in-dev-mode)
* [Build (production)](#user-content-build-production)
* [Linting](#user-content-linting)
* [Changelog](#user-content-changelog)

# Description

Simple app for uploading/displaying a list of photos.
Frontend: React 16.x, Bootstrap 3.x and Webpack 4.x for ES6 support
Backend: Sails.js v1, Node.js 8.x

# Features
- Sails.js v1
- React 16
- Bootstrap 3
- Webpack 4 (development and production configuration)
- Babel (ES6)
- Hot Module Replacement
- SCSS support
- Linting (eslint and eslint-plugin-react)
- Skipper-disk and Skipper-s3 configuration

# Next features
- Amazon Web Services
- Tests (Mocha for backend and Jest for frontend)

# Setup
Node.js must be installed. For more information on this subject, refer to this page: https://nodejs.org/en/

Install dependencies:

``` $ npm install ```

Other references:

Sails.js: https://sailsjs.com/
React: https://reactjs.org/
Bootstrap: https://getbootstrap.com/docs/3.3/
React-Bootstrap wrapper: https://react-bootstrap.github.io/
Webpack: https://webpack.js.org/
Babel: https://babeljs.io/

# Running in dev mode

``` $ npm run start:all ```

This will run start client's webpack-dev-server and server's sails lift commands

# Build (production)

``` $ npm run build ```

Note: This is currently experimental and will only build the frontend app

# Linting

Modules used: eslint and eslint-plugin-react

``` $ npm test ```

This command is used for linting. For more information about the linting tool used, refer to this page: https://eslint.org/
