'use strict';

export default (routes, handleRoute) => {
  const use = (req, res, next) => {
    const result = match(req.url);
    handleRoute(() => result(), req, res, next);
  };

  use.match = match;

  return use;

  function match(url) {
    if (routes[url]) {
      return routes[url];
    }
    return () => {
      console.log(url);
    };
  }
};
