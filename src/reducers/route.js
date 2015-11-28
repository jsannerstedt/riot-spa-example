'use strict';

const homeRoute = 'home';

module.exports = {
    initialState: () => ({activeView: homeRoute}),
    routeChange: payload => ({activeView: payload || homeRoute})
};
