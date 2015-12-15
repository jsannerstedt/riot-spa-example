'use strict';

import actions from '../actions';

export default {
  doAsync: () => setTimeout(() => actions.doAsyncSuccess(), 1000)
};
