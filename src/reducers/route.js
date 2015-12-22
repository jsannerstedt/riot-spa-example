'use strict';

const homeRoute = 'home';

export default {
  initialState: () => ({ activeView: homeRoute, isNavigating: false }),
  navigate: () => ({ isNavigating: true }),
  routeChange: payload => ({ isNavigating: false, activeView: payload.slice(1) || homeRoute })
};
