'use strict';

import actions from './src/actions';

export default {
  '/': () => [
    actions.routeChange('/home')
  ],
  '/home': () => [
    actions.routeChange('/home')
  ],
  '/about': () => [
    actions.routeChange('/about')
  ],
  '/async': () => [
    actions.routeChange('/async')
  ]
};
