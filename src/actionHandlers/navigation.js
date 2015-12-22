'use strict';

import createRouter from '../utils/router';
import routes from '../config/routes';
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
