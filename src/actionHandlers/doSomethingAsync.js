export default {
  doAsync: actions =>
    setTimeout(() => {
      actions.doAsyncSuccess();
    }, 1000)
};
