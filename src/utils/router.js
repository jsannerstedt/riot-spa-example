'use strict';

export default (routes, handleRoute) => {
  const use = (req, res, next) => {
    const result = match(req.url);
    if (result) {
      handleRoute(() => result(), req, res, next);
    } else {
      next();
    }
  };

  use.match = match;

  return use;

  function match(url) {
    if (routes[url]) {
      return routes[url];
    }
    return false;
  }
};
