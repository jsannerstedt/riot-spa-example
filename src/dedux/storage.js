'use strict';

export default { get, set };

function set(key, value) {
  if (typeof localStorage === 'undefined') {
    return;
  }
  localStorage[key] = JSON.stringify(value);
}

function get(key) {
  let val;
  if (typeof localStorage === 'undefined') {
    return {};
  }
  val = localStorage[key];
  return val ? JSON.parse(val) : {};
}
