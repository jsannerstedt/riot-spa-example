'use strict';

import { combineReducers } from '../dedux';
import route from './route';
import async from './async';

export default combineReducers({ route, async });
