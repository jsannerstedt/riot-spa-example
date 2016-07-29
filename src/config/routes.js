export default actions => ({
  '/': () => [
    actions.routeChange('home')
  ],
  '/home': () => [
    actions.routeChange('home')
  ],
  '/about': () => [
    actions.routeChange('about')
  ],
  '/async': () => [
    actions.routeChange('async'),
    actions.doAsync()
  ]
});
