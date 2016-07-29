<my-router>
  <div name="content"></div>

  <script type="text/babel">
    let currentTag, currentView;

    // compare active view in the state, to what we already have
    // either perform update, or unmount old and mount new view
    this.mountSubView = () => {
      const state = this.opts.state;
      const viewName = state.route.activeView;

      if (currentView === viewName) {
        currentTag.opts.state = state;
        currentTag.update();
        return;
      }

      if (currentTag) {
        currentTag.unmount(true);
      }

      if (viewName) {
        currentTag = riot.mount(this.content, viewName + '-view', { state: state })[0];
        currentView = viewName;
      }
    };

    this.mountSubView();

    // whenever state is updated
    this.on('update', () => this.mountSubView());
  </script>
</my-router>
