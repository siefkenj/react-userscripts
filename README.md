# react-userscripts
Develop a Greasemonkey/Tampermonkey script using React

This repository contains a stub project for developing userscript extensions with react. It uses
`react-app-rewired` to change the webpack configuration to compile React code so that it can be
included in a userscript.

In Firefox or Chrome, install [Greasemonkey](https://addons.mozilla.org/en-CA/firefox/addon/greasemonkey/) or Tampermonkey.
You can then test the userscript by installing it [here](https://github.com/siefkenj/react-userscripts/raw/master/dist/react-userscripts.user.js).
Navigate to [google](https://www.google.com) and you should see a react component inserted at the bottom of the page.

# Development

## Building

To build `react-userscripts` you must have [Node.js](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
Then, from the `react-userscripts` directory, run

```
cd userscript/
npm install
npm run build
```

When the build script completes, you should have a fresh version of the userscript located at `dist/react-userscripts.user.js`
(in the top-level `dist/` directory). (Ignore the message provided on the console about serving the project; that message is for
developing a normal web application, not a userscript addon.)

## Development and Dynamic Loading

When developing, it's nice to be able to get the newest version of your script upon a page
refresh. To do this, install the development version of `react-userscripts` script located
`dist/react-userscripts-dev.user.js` or click [here](https://github.com/siefkenj/react-userscripts/raw/master/dist/react-userscripts-dev.user.js).
The dev script will dynamically load the extension from port `8124`, so you can take advantage of
auto-recompilation when source files change.

Now, run

```
cd userscript/
npm install    # if you haven't already
npm start
```

and a development server should start running on `localhost:8124`. Changing any files in `userscript/src` will trigger
and automatic recompile which will be served to the dev addon on the next page reload.
