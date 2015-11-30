# riot-spa-example

Simple riot app with browserify.

    mkdir dist
    npm install
    npm run dev

One store to rule them all. The store handles state, state is modified by running reducers. Reducers are run as a response to an action. Actions are functions to wich you can subscribe. The store will make sure reducers are run for actions with the same name.

Typical interaction would be

    // view
    <button onclick="{ doIt }">Doit</button>
    <p>{ opts.state.didIt }</p>
    <script>
      this.doIt = e => actions.doIt();
    </script>

    //actions
    const actions = createActions(['doIt']);

    //reducer
    {
      doIt: (payload, state) => ({didIt: payload})
    }

Async or actions with side effects are handled through actionHandlers.

    // view
    <button onclick="{ doIt }">Doit</button>
    <p if="{ opts.state.isLoading }">Loading.... </p>
    <p>{ opts.state.result }</p>
    <script>
      this.doIt = e => actions.doIt();
    </script>

    //actions
    const actions = createActions(['doIt', 'doItSuccess']);

    //actionHandler
    {
        doIt: (payload, state) => {
            service.get()
                .then(actions.doItSuccess);
        }
    }

    //reducer
    {
      doIt: (payload, state) => ({isLoading: true}),
      doItSuccess: (payload, state) => ({isLoading: false, result: payload})
    }