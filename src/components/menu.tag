<my-menu>
    <ul>
        <li each="{ items }"><a href="{ href }" onclick="{ parent.navigate }">{ name }</a></li>
    </ul>

    <script>
        const menuItems = require('../config/menu');
        const actions = require('../actions');

        this.items = menuItems.map(item => ({name: item, href: '#' + item}));
        this.navigate = e => actions.navigate(e.target.hash.slice(1));
    </script>
</my-menu>