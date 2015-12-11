<my-menu>
    <ul>
        <li each="{ items }"><a href="{ href }" onclick="{ navigate }">{ name }</a></li>
    </ul>

    <script type="text/babel">
        import menuItems from '../config/menu';
        import actions from '../actions';

        this.items = menuItems.map(item => ({name: item, href: '#' + item, navigate: this.navigate}));
        this.navigate = e => actions.navigate(e.target.hash.slice(1));
    </script>
</my-menu>
