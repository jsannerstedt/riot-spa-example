'use strict';

import actions from '../actions';
import actionHandlers from '../actionHandlers';

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
    actions.routeChange('/async'),
    actionHandlers.async.doAsync()
  ]
};
