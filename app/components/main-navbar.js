import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MainNavbarComponent extends Component {
  @service bitski;

  get isLoggedIn() {
    return this.bitski.isLoggedIn;
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
