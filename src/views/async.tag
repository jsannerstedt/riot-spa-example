<async-view>
  <button onclick="{ doAsync }">Do async action</button>
  <p show="{ opts.state.async.doingIt }">Doing it....</p>
  <p show="{ opts.state.async.didit }">Done!</p>
  <script type="text/babel">
    const actions = require('../actions').default;
    this.doAsync = () => actions.doAsync();
  </script>
</async-view>
