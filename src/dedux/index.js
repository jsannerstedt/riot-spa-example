'use strict';

const riot = require('riot');
const utils = require('../utils');
const storage = require('../storage');
const UPDATE = 'update';

module.exports = {
    createStore,
    createActions
};

function createStore(reducers, actions, initialState) {
    const events = riot.observable();
    const debouncedNotify = utils.debounce(notify, 1);
    const subscribe = getSubscriptionFunction(events);
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

        events.trigger(UPDATE, state);
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
}

function createActions(actionNames) {
    return actionNames.reduce((actions, name) => {
        actions[name] = getAction(name);
        return actions;
    }, {});

    function getAction(name) {
        const events = riot.observable();
        const func = function runAction(data) {
            // console.log('action: ' + name, data);
            events.trigger(UPDATE, data);
            return data;
        };

        func.actionName = name;

        func.subscribe = getSubscriptionFunction(events);

        return func;
    }
}

function getSubscriptionFunction(events) {
    return function subscribe(callback) {
        events.on(UPDATE, callback);
        return {
            unsubscribe: () => events.off(UPDATE, callback)
        };
    };
}
