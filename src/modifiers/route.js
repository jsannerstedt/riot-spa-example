const homeRoute = 'home';

export default {
  initialState: () => ({ activeView: homeRoute, isNavigating: false }),
  navigate: () => ({ isNavigating: true }),
  routeChange: activeView => ({ isNavigating: false, activeView: activeView || homeRoute })
};
