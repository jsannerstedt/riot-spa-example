'use strict';

module.exports = {
    extend: function(...args) {
        return Object.assign({}, ...args);
    },
    forOwn: function(object, cb) {
        let i;
        if (!object) {
            return;
        }
        for (i in object) {
            if (object.hasOwnProperty(i)) {
                cb(object[i], i);
            }
        }
    },
    getSubscriptionFunction: function(events) {
        return function subscribe(callback) {
            events.on('update', callback);
            return {
                unsubscribe: () => events.off('update', callback)
            };
        };
    },
    debounce: (cb, ms) => {
        let timeout;

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(cb, ms);
        };
    }
};
