'use strict';

import actions from '../actions';

export default {
  doAsync: () => new Promise(resolve => {
    setTimeout(() => {
      actions.doAsyncSuccess();
      resolve();
    }, 1000);
  })
};
