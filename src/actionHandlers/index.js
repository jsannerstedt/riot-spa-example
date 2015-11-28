'use strict';

const actions = require('../actions');
const utils = require('../utils');
const handlers = [require('./navigation')];

handlers.forEach(handler => {
    utils.forOwn(handler, (callback, key) => actions[key].subscribe(callback));
});
