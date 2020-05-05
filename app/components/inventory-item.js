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

  get price() {
    if (this.args.item) {
      return (this.args.item.price / 100).toFixed(0);
    } else {
      return '';
    }
  }

  @action
  async buy() {
    this.error = false;
    let { title, productId, price } = this.args.item;

    try {
      let user = await this.bitski.getSignedInUser();
      let token = await this.stripe.showCheckoutForm(title, price);
      await this.fulfillment.processPurchase(token, productId, user.accounts[0]);

      this.purchased = true;
    } catch (err) {
      this.error = err;
    }
  }
}
