'use strict';

const riot = require('riot');
const actions = require('../actions');
const actionHandlers = require('../actionHandlers');
const utils = require('../utils');
const storage = require('../storage');

module.exports = function (reducers, initialState) {
    var events = {};
    var state = {};

    riot.observable(events);

    utils.forOwn(actions, (action, name) => {
        action.subscribe(value => {
            runActionHandlers(name, value);
            updateState(name, value);
        });
    });

    if (process.env.ENV === 'development') {
        state = storage.get('state');
    }

    state = utils.extend(getInitialState(), initialState, state);

    return {
        subscribe: subscribe,
        getState: getState
    };

    function getState() {
        return state;
    }

    function getInitialState() {
        return calculateNewState('initialState');
    }

    function runActionHandlers(name, value) {
        var actionHandler = actionHandlers[name];
        if (actionHandler) {
            actionHandler(value, getState());
        }
    }

    function updateState(action, value) {
        if (!reducers[action]) {
            return;
        }
        state = calculateNewState(action, value);

        if (process.env.ENV === 'development') {
            storage.set('state', state);
        }
        //console.log(state);

        events.trigger('state.updated', state);
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
                    [reducer.namespace]: utils.extend(state[reducer.namespace], reducer(state[reducer.namespace], payload))
                }),
            state || {}
        );
    }

    function subscribe(cb) {
        events.on('state.updated', cb);
        return {
            unsubscribe: () => {
                events.off('state.updated', cb);
            }
        };
    }
};