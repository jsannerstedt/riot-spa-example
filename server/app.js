'use strict';
require('babel-register');
var server = require('./server').default;
server(process.env.PORT || 3000);
