'use strict';

require('./app.tag');
require('./components');
require('./views');
require('./actionHandlers');
const riot = require('riot');
const createStore = require('./dedux').createStore;
const reducers = require('./reducers');
const actions = require('./actions');
const store = createStore(reducers, actions);

// routing
riot.route(route => actions.routeChange(route));
riot.route.start(true);

const app = riot.mount('my-app', {state: store.getState()})[0];

store.subscribe(state => {
    app.opts.state = state;
    app.update();
});
