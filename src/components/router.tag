<my-router>
  <div name="content">
  </div>

  <script type="text/babel">
    let currentTag, currentView;

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
