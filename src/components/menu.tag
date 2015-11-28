<my-menu>
    <ul>
        <li each="{ items }"><a href="{ href }" onclick="{ navigate }">{ name }</a></li>
    </ul>

    <script type="text/babel">
        const menuItems = require('../config/menu');
        const actions = require('../actions');

        this.items = menuItems.map(item => ({name: item, href: '#' + item, navigate: this.navigate}));
        this.navigate = e => actions.navigate(e.target.hash.slice(1));
    </script>
</my-menu>