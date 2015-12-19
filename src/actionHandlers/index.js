'use strict';

import actions from '../actions';
import { forOwn } from '../utils';
import navigation from'./navigation';
import async from './doSomethingAsync';

[navigation, async].forEach(handler =>
  forOwn(handler, (callback, key) => actions[key].subscribe(callback))
);
