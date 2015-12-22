<my-menu>
    <ul>
        <li each="{ items }"><a href="{ href }" onclick="{ navigate }">{ name }</a></li>
    </ul>

    <script type="text/babel">
        const menuItems = require('../config/menu').default;
        const actions = require('../actions').default;

        this.navigate = e => actions.navigate(e.item.href);
        this.items = menuItems.map(item => ({name: item, href: '/' + item, navigate: this.navigate}));
    </script>
</my-menu>
