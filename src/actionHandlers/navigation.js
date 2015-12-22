'use strict';

export default {
  navigate: payload => {
    if (typeof history !== 'undefined') {
      history.pushState(null, null, payload);
    }
  }
};
