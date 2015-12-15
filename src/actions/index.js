'use strict';

import { createActions } from '../dedux';

export default createActions([
  // navigation
  'navigate',
  'routeChange',

  'doAsync',
  'doAsyncSuccess'
]);
