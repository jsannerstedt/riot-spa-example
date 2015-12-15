'use strict';

export {
  extend,
  forOwn,
  getSubscriptionFunction,
  debounce
};

function debounce(cb, ms) {
  let timeout;

  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(cb, ms);
  };
}

function getSubscriptionFunction(events) {
  return function subscribe(callback) {
    events.on('update', callback);
    return {
      unsubscribe: () => events.off('update', callback)
    };
  };
}

function forOwn(object, cb) {
  let i;
  if (!object) {
    return;
  }
  for (i in object) {
    if (object.hasOwnProperty(i)) {
      cb(object[i], i);
    }
  }
}

function extend(...args) {
  return Object.assign({}, ...args);
}
