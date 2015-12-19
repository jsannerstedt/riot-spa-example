'use strict';

import storage from './storage';
import { forOwn, extend, debounce, getSubscriptionFunction, createEventStore } from './utils';

export default function createStore(reducers, actions, initialState) {
  const events = createEventStore();
  const debouncedNotify = debounce(notify, 1);
  let state = {};

  forOwn(actions, (action, name) =>
    action.subscribe(value => updateState(name, value))
  );

  if (process.env.NODE_ENV !== 'production') {
    state = storage.get('state');
  }

  state = extend(calculateNewState('initialState'), initialState, state);

  return {
    subscribe: events.on,
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

    events.trigger(state);
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
        extend(previous, {
          [reducer.namespace]: extend(state[reducer.namespace], reducer(payload, state[reducer.namespace]))
        }),
      state || {}
    );
  }
};
