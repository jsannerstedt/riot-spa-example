export default (url, routes) => {
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
};
