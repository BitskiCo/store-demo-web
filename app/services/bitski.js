import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { AuthenticationStatus, Bitski } from 'bitski';
import ENV from 'store-demo/config/environment';

export default class BitskiService extends Service {
  @tracked isLoggedIn;

  constructor() {
    super(...arguments);
    this._bitski = new Bitski(ENV.bitskiClientId, window.location.origin + '/redirect-callback');
    this.isLoggedIn = this._bitski.authStatus !== AuthenticationStatus.NotConnected;
  }

  logIn() {
    return this._bitski.signIn().then((user) => {
      this.isLoggedIn = true;
      return user;
    });
  }

  logOut() {
    return this._bitski.signOut().then(() => this.isLoggedIn = false);
  }

  getSignedInUser() {
    if (this.isLoggedIn) {
      return this._bitski.getUser();
    } else {
      return this._bitski.signIn();
    }
  }
}
