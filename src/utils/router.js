'use strict';

export default (routes, handleRoute) => {
  const use = (req, res, next) => {
    const result = match(req.url);
    if (result) {
      handleRoute(result, req, res, next);
    } else {
      next();
    }
  };

  use.match = match;

  return use;

  function match(url) {
    const keys = Object.keys(routes);
    let len = keys.length;
    while (len--) {
      const path = keys[len];
      const route = routes[path];
      const matcher = new RegExp('^' + path.replace(/:[^\s/]+/g, '([\\w-]+)') + '$');
      const result = url.match(matcher);
      if (result) {
        return () => route(...result.slice(1));
      }
    }

    return false;
  }
};
