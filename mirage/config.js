export default function() {
  this.timing = 400;

  this.post('process-transaction', () => {
    return {};
  });

  this.passthrough('/assets/inventory.json');
  this.passthrough('https://checkout.stripe.com/*');
}
