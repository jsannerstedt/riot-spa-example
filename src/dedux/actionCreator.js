'use strict';

import riot from 'riot';
import { getSubscriptionFunction} from './utils';

export default function createActions(actionNames) {
  return actionNames.reduce((actions, name) => {
    actions[name] = getAction(name);
    return actions;
  }, {});

  function getAction(name) {
    const events = riot.observable();
    const func = function runAction(data) {
      // console.log('action: ' + name, data);
      events.trigger('update', data);
      return data;
    };

    func.actionName = name;

    func.subscribe = getSubscriptionFunction(events);

    return func;
  }
};
