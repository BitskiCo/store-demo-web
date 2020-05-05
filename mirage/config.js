import Response from 'ember-cli-mirage/response';

export default function() {
  this.timing = 400;

  this.post('process-transaction', (_, request) => {
    let body = JSON.parse(request.requestBody);
    if (body.token && body.productId && body.recipient) {
      return {};
    } else {
      return new Response(422, { 'error': { 'message': 'Invalid parameters' }});
    }
  });

  this.passthrough('/inventory/tokens.json');
  this.passthrough('https://checkout.stripe.com/*');
  this.passthrough('https://account.bitski.com/*');
}
