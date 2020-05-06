import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MainNavbarComponent extends Component {
  @service bitski;
  @tracked expanded = false;

  get isLoggedIn() {
    return this.bitski.isLoggedIn;
  }

  @action
  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  @action
  logIn() {
    this.bitski.logIn();
  }

  @action
  logOut() {
    this.bitski.logOut();
  }
}
