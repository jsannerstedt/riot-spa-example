'use strict';

import { forOwn, extend, debounce, createEventStore } from './utils';

export default (reducers, actions, initialState) => {
  const events = createEventStore();
  const notify = debounce(() => events.trigger(state), 1);
  let state = extend(calculateNewState('initialState'), initialState);

  forOwn(actions, (action, name) => action.subscribe(value => updateState(name, value)));

  return {
    subscribe: events.on,
    getState: () => state
  };

  function updateState(action, value) {
    if (!reducers[action]) return;

    state = calculateNewState(action, value);

    notify();
  }

  /**
   * Runs all reducers for a given action
   * Will extend the current state with changes
   * @param action
   * @param payload
   * @returns {*} the new state
   */
  function calculateNewState(action, payload) {
    return reducers[action].reduce((previous, reducer) =>
        extend(previous, {
          [reducer.namespace]: extend(state[reducer.namespace], reducer(payload, state[reducer.namespace]))
        }),
      state || {}
    );
  }
};
