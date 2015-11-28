'use strict';

module.exports = {
    guid: function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },
    forOwn: function forOwn(object, cb) {
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
    extend: function extend() {
        const args = Array.prototype.slice.call(arguments);
        args.unshift({});
        return Object.assign.apply(null, args);
    },
    trimLeadingSlash: url => {
        if (url[0] === '/') {
            return url.slice(1);
        }
        return url;
    },
    debounce: (cb, ms) => {
        let timeout;

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(cb, ms);
        };
    },
    filter: (arr, predicate) => {
        const results = [];
        arr.forEach(value => {
            if (predicate(value)) results.push(value);
        });
        return results;
    },
    noop: () => {
    },
    getObjectFromQueryString: url => {
        const query = url.split('?')[1];
        if (!query) {
            return {};
        }
        const keyValues = query.split('&');
        const result = {};

        keyValues.forEach(keyValue => {
            const pair = keyValue.split('=');
            result[pair[0]] = decodeURIComponent(pair[1]);
        });
        return result;
    }
};
