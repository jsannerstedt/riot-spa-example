'use strict';

const homeRoute = 'home';

export { routeChange, initialState };

function routeChange(payload) {
  return ({ activeView: payload || homeRoute });
}
function initialState() {
  return ({ activeView: homeRoute });
}
