import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    return fetch('/assets/inventory.json').then(res => res.json());
  }
}
