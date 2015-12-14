'use strict';

import * as storage from './storage';
import * as riot from 'riot';
import { forOwn, extend, debounce, getSubscriptionFunction } from './utils';

export default function createStore(reducers, actions, initialState) {
  const events = riot.observable();
  const debouncedNotify = debounce(notify, 1);
  const subscribe = getSubscriptionFunction(events);
  let state = {};

  forOwn(actions, (action, name) => {
    action.subscribe(value => {
      updateState(name, value);
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    state = storage.get('state');
  }

  state = extend(calculateNewState('initialState'), initialState, state);

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
        extend(previous, {
          [reducer.namespace]: extend(state[reducer.namespace], reducer(payload, state[reducer.namespace]))
        }),
      state || {}
    );
  }
};
