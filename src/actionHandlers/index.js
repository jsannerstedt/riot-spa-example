'use strict';

import actions from '../actions';
import { forOwn } from '../utils';
import navigation from'./navigation';
import async from './doSomethingAsync';

const actionHandlers = { navigation, async };

Object.keys({ navigation, async }).forEach(name =>
  forOwn(actionHandlers[name], (callback, key) => actions[key].subscribe(callback))
);

export default actionHandlers;
