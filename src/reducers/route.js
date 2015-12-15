'use strict';

const homeRoute = 'home';

export default {
  initialState: () => ({ activeView: homeRoute }),
  routeChange: payload => ({ activeView: payload || homeRoute })
};
