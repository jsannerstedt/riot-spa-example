'use strict';

import './app.tag';
import './components';
import './views';
import './actionHandlers';
import riot from 'riot';
import { createStore } from './dedux';
import reducers from './reducers';
import actions from './actions';
const store = createStore(reducers, actions);

// routing
riot.route(route => actions.routeChange(route));
riot.route.start(true);

const app = riot.mount('my-app', { state: store.getState() })[0];

store.subscribe(state => {
  app.opts.state = state;
  app.update();
});
