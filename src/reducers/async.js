'use strict';

export default {
  initialState: () => ({ doingIt: false, didit: false }),
  doAsync: () => ({ doingIt: true, didit: false }),
  doAsyncSuccess: () => ({ doingIt: false, didit: true })
};
