'use strict';

import { createActions } from '../dedux';
import reducers from '../reducers';

export default createActions(Object.keys(reducers));
