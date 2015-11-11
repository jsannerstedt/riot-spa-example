<my-menu>
    <ul>
        <li each="{ items }"><a href="{ href }" onclick="{ parent.navigate }">{ name }</a></li>
    </ul>

    <script>
        var menuItems = require('../../config/menu');
        var riot = require('riot');
        this.items = menuItems.map(item => ({name: item, href: '/' + item}));

        this.navigate = function(e) {
            riot.route(e.target.pathname);
        }
    </script>
</my-menu>