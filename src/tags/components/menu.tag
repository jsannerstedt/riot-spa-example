<my-menu>
  <ul>
    <li each="{ items }"><a href="{ href }">{ name }</a></li>
  </ul>

  <script type="text/babel">
    const menuItems = ['home', 'async', 'about'];

    this.items = menuItems.map(item => ({ name: item, href: '/' + item }));
  </script>

  <style scoped>
    ul {
      margin: 0;
      padding: 0;
    }

    li {
      list-style: none;
      display: inline;
      margin-right: 1em;
    }
  </style>
</my-menu>
