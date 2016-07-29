export default {
  navigate: (actions, { href, router }) => {
    const result = router(href);
    if (typeof history !== 'undefined') {
      history.pushState(null, null, href);
    }
    result();
  }
};
