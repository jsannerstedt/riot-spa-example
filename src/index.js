import './tags';
import modifiers from './modifiers';
import actionHandlers from './actionHandlers';
import riot from 'riot';
import createApp from 'dedux-app';
import doRoute from './utils/router';
import initRoutes from './config/routes';
import { traverse } from './utils';

const { actions, store } = createApp(modifiers, actionHandlers, getInitialState());
const routes = initRoutes(actions);

// we make a global mixin of actions so we don't have to import them in every tag
riot.mixin({ actions });

// fist perform a navigation so state is aligned with the current url
navigate(location.pathname);

// now create the main riot tag
const app = riot.mount('my-app', { state: store.getState() })[0];

// listen to any state changes, and start the one way data flow
store.subscribe((state, action, payload) => {
  app.opts.state = state;
  app.update();
  console.log(action, payload);
});

// listen to nav events, i.e back button in browser
window.addEventListener('popstate', () => navigate(location.pathname));

// intercept all clicks and if anchor tag, navigate
document.addEventListener('click', e => {
  const anchor = traverse(e.target, 'a');
  if (anchor && !anchor.onclick && anchor.href) {
    e.preventDefault();
    navigate(anchor.pathname);
  }
});

function navigate(href) {
  actions.navigate({ href, router: href => doRoute(href, routes) });
}

function getInitialState() {
  const data = document.getElementById('initial_state').innerHTML;
  return data ? JSON.parse(data) : {};
}
