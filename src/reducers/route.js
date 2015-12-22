'use strict';

const homeRoute = 'home';

export default {
  initialState: () => ({ activeView: homeRoute }),
  navigate: payload => ({ activeView: payload.slice(1) || homeRoute })
};
