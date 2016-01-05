'use strict';

import { createActions } from 'dedux';
import modifiers from '../modifiers';

export default createActions(Object.keys(modifiers));
