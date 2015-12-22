'use strict';

import express from 'express';
import riot from 'riot';
import '../src/views';
import '../src/components';
import appTag from '../src/app.tag';
import { createStore } from '../src/dedux/';
import router from '../src/utils/router';
import routes from '../src/config/routes';
import reducers from '../src/reducers';
import actions from '../src/actions';

export default port => {
  const app = express();
  app.use('/dist', express.static(__dirname + '/../dist'));
  app.use(router(routes, handleRoute));
  app.use(handleRender);
  app.listen(port);
};

function handleRender(req, res) {
  const state = req.initialState;
  if (state) {
    const html = riot.render(appTag, { state: state });
    res.send(renderFullPage(html, JSON.stringify(state)));
  }
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
                <script type="application/json" id="initial_state">
                  ${ initialState }
                </script>
                <script type="text/javascript" src="dist/index.js"></script>
              </body>
            </html>`;
}

function handleRoute(result, req, res, next) {
  const store = createStore(reducers, actions);
  const promises = result();
  Promise.all(promises)
    .then(() => {
      req.initialState = store.getState();
      next();
    })
    .catch(next);
}
