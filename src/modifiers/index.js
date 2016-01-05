'use strict';

import { combineModifiers } from 'dedux';
import route from './route';
import async from './async';

export default combineModifiers({ route, async });
