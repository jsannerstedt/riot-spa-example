'use strict';

const combineReducers = require('../dedux').combineReducers;

module.exports = combineReducers({
    route: require('./route')
});
