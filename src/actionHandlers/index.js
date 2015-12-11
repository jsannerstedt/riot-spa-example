'use strict';

import actions from '../actions';
import { forOwn } from '../utils';
import navigation from'./navigation';

[navigation].forEach(handler => {
  forOwn(handler, (callback, key) => actions[key].subscribe(callback));
});
