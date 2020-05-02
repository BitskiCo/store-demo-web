import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class InventoryItemComponent extends Component {
  @service bitski;
  @service stripe;
  @service fulfillment;

  @tracked error;
  @tracked purchased = false;

  @action
  async buy() {
    this.error = false;

    try {
      let user = await this.bitski.getSignedInUser();
      let token = await this.stripe.showCheckoutForm(this.args.item.title, 1000);
      await this.fulfillment.processPurchase(token, user.accounts[0]);

      this.purchased = true;
    } catch (err) {
      this.error = err;
    }
  }
}
