'use strict';

const riot = require('riot');

module.exports = {
    navigate: (payload) => riot.route(payload)
};
