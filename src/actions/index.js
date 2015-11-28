'use strict';

var createActions = require('../dedux').createActions;

module.exports = createActions([
    // navigation
    'navigate',
    'routeChange'
]);