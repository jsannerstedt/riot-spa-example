'use strict';

import createRouter from '../../router';
import routes from '../../routes';
const router = createRouter(routes);

export default {
  navigate: payload => {
    const result = router.match(payload);
    if (typeof history !== 'undefined') {
      history.pushState(null, null, payload);
    }
    result();
  }
};
