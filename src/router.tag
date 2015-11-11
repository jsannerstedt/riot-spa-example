<my-router>
    <div id="content">
        <home-view name="first"></home-view>
    </div>

    <script>
        var riot = require('riot');
        var current = this.tags.first;

        riot.route((view) => {
            current.unmount(true);
            current = riot.mount('#content', view + '-view')[0];
        });

        riot.route.start();
    </script>
</my-router>