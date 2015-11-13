<my-router>
    <div id="content">

    </div>

    <script>
        var currentRoute = this.opts.state.route;
        var currentTag;

        // first load
        this.one('mount', () => mount(this.opts.state));

        // whenever state is updated
        this.on('update', route.bind(this));

        function route() {
            if(currentRoute !== this.opts.state.route){
                mount(this.opts.state);
            }
        }

        function mount(state) {
            const viewName = state.route.activeView + '-view';
            if(currentTag){
                currentTag.unmount(true);
            }
            currentTag = riot.mount('#content', viewName, {state: state})[0];
        }
    </script>
</my-router>