'use strict';

import './app.tag';
import './components';
import './views';
import './actionHandlers';
import riot from 'riot';
import { createStore } from './dedux';
import reducers from './reducers';
import actions from './actions';

const store = createStore(reducers, actions, getInitialState());

// routing
riot.route(route => actions.routeChange(route));
riot.route.start();

const app = riot.mount('my-app', { state: store.getState() })[0];

store.subscribe(state => {
  app.opts.state = state;
  app.update();
});

window.addEventListener('popstate', () => {
  actions.routeChange(location.pathname);
});

function getInitialState() {
  const data = document.getElementById('initial_state').innerHTML;
  return JSON.parse(data);
}
