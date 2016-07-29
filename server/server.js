import express from 'express';
import riot from 'riot';
import '../src/tags';
import createApp from 'dedux-app';
import doRoute from '../src/utils/router';
import initRoutes from '../src/config/routes';
import modifiers from '../src/modifiers';
import actionHandlers from '../src/actionHandlers';

export default port => {
  const app = express();
  app.use('/dist', express.static(__dirname + '/../dist'));
  app.use(handleRoute);
  app.use(handleRender);
  app.listen(port);
};

function handleRoute(req, res, next) {
  const { actions, store } = createApp(modifiers, actionHandlers);
  const routes = initRoutes(actions);
  const execRoute = doRoute(req.url, routes);

  if(!execRoute){
    next();
    return;
  }

  // execing the route will return an array of arrays with potential promises
  const promises = execRoute().reduce((prev, curr) => prev.concat(curr));

  // when all have completed, get the state
  // this allows us to wait for api calls and such, before rendering
  Promise.all(promises)
    .then(() => {
      req.initialState = store.getState();
      next();
    })
    .catch(next);
}

function handleRender(req, res) {
  const state = req.initialState;
  if (state) {
    const html = riot.render('my-app', { state: state });
    res.send(renderFullPage(html, JSON.stringify(state)));
  }
}

function renderFullPage(html, initialState) {
  return `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <title>Title</title>
                <link rel="stylesheet" href="/dist/main.css">
              </head>
              <body>
                ${ html }
                <script type="application/json" id="initial_state">
                  ${ initialState }
                </script>
                <script type="text/javascript" src="/dist/index.js"></script>
              </body>
            </html>`;
}
