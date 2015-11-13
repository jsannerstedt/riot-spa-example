'use strict';

require('./app.tag');
require('./components');
require('./views');
const riot = require('riot');
const createStore = require('./store');
const reducers = require('./reducers');
const actions = require('./actions');
const store = createStore(reducers);

actions.routeChange(window.location.hash.slice(1) || 'home');

const app = riot.mount('my-app', {state: store.getState()})[0];

store.subscribe(state => app.update({state: state}));

