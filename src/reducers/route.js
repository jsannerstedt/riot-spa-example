'use strict';

const homeRoute = 'home';

export default {
  initialState: () => ({ activeView: homeRoute, isNavigating: false }),
  navigate: () => ({ isNavigating: true }),
  routeChange: payload => ({ activeView: payload || homeRoute, isNavigating: false })
};
