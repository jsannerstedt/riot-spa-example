'use strict';

import storage from './storage';
import riot from 'riot';
import utils from './utils';

export default function createStore(reducers, actions, initialState) {
  const events = riot.observable();
  const debouncedNotify = utils.debounce(notify, 1);
  const subscribe = utils.getSubscriptionFunction(events);
  let state = {};

  utils.forOwn(actions, (action, name) => {
    action.subscribe(value => {
      updateState(name, value);
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    state = storage.get('state');
  }

  state = utils.extend(calculateNewState('initialState'), initialState, state);

  return {
    subscribe,
    getState: () => state
  };

  function updateState(action, value) {
    if (!reducers[action]) return;

    state = calculateNewState(action, value);

    if (process.env.NODE_ENV !== 'production') {
      storage.set('state', state);
      console.log('action: ' + action);
    }
    debouncedNotify();
  }

  function notify() {
    if (process.env.NODE_ENV !== 'production') {
      console.log(state);
    }

    events.trigger('update', state);
  }

  /**
   * Runs all reducers for a given action
   * Will extend the current state with changes
   * @param action
   * @param payload
   * @returns {*} the new state
   */
  function calculateNewState(action, payload) {
    return reducers[action].reduce(
      (previous, reducer) =>
        utils.extend(previous, {
          [reducer.namespace]: utils.extend(state[reducer.namespace], reducer(payload, state[reducer.namespace]))
        }),
      state || {}
    );
  }
};
