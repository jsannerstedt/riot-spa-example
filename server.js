'use strict';

import express from 'express';
import riot from 'riot';
import './src/views';
import './src/components';
import appTag from './src/app.tag';
import { createStore } from './src/dedux/';
import reducers from './src/reducers';
import actions from './src/actions';

export default port => {
  const app = express();

  app.use('/dist', express.static('dist'));
  app.use(handleRender);
  app.listen(port);

  function handleRender(req, res) {
    const state = getState(req);
    const html = riot.render(appTag, { state: state });

    res.send(renderFullPage(html, JSON.stringify(state)));
  }

  function renderFullPage(html, initialState) {
    return `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <title>Title</title>
                <link rel="stylesheet" href="dist/main.css">
              </head>
              <body>
                ${ html }
                <script type="application/json" id="initial_state">${ initialState }</script>
                <script type="text/javascript" src="dist/index.js"></script>
              </body>
            </html>`;
  }

  function getState(req) {
    const store = createStore(reducers, actions);
    actions.navigate(req.originalUrl);
    return store.getState();
  }
};
