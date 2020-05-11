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

  async logIn() {
    let user = await this._bitski.signIn();
    this.isLoggedIn = true;

    if (user.accounts && user.accounts.length > 0) {
      return user;
    } else {
      // Sessions do not always include accounts, e.g. newly created user accounts.
      let accessToken = await this._bitski.getCurrentAccessToken();
      let accounts = await this.fetchAccounts(accessToken);
      user.accounts = accounts;
      this._bitski.authProvider.userStore.set(user);
      return user;
    }
  }

  async fetchAccounts(accessToken) {
    let response = await fetch('https://api.bitski.com/v1/web3/mainnet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
    });
    let json = await response.json();

    return json.result;
  }

  logOut() {
    return this._bitski.signOut().then(() => this.isLoggedIn = false);
  }

  getSignedInUser() {
    if (this.isLoggedIn) {
      return this._bitski.getUser();
    } else {
      return this.logIn();
    }
  }
}
