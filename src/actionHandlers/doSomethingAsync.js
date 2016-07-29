export default {
  doAsync: actions => new Promise(resolve => {
    setTimeout(() => {
      actions.doAsyncSuccess();
      resolve();
    }, 1000);
  })
};
