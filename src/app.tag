<my-app>
    <my-menu></my-menu>
    <h1>My app</h1>
    <my-router state="{ state }"></my-router>
    <script>
        this.state = this.opts.state;
    </script>
</my-app>