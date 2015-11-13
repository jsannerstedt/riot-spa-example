'use strict';

var utils = require('../utils');

module.exports = {
    initialState: () => ({activeView: 'home'}),
    routeChange: (state, payload) => ({
        activeView: payload
    })
};