'use strict';

import { createEventStore } from './utils';

export default actionNames => {
  return actionNames.reduce((actions, name) => {
    actions[name] = getAction(name);
    return actions;
  }, {});
};

function getAction(name) {
  const events = createEventStore();
  const func = function runAction(data) {
    events.trigger(data);
    return data;
  };

  func.actionName = name;

  func.subscribe = events.on;

  return func;
}
