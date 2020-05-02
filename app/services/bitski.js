import Service from '@ember/service';
import { AuthenticationStatus, Bitski } from 'bitski';
import ENV from 'store-demo/config/environment';

export default class BitskiService extends Service {

  constructor() {
    super(...arguments);
    this._bitski = new Bitski(ENV.bitskiClientId, window.location.origin + '/redirect-callback');
  }

  getSignedInUser() {
    if (this._bitski.authStatus === AuthenticationStatus.NotConnected) {
      return this._bitski.signIn();
    } else {
      return this._bitski.getUser();
    }
  }
}
