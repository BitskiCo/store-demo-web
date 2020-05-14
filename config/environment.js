'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'store-demo',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    brandedCheckout: true,
    bitskiClientId: 'cf737565-7a9f-4c42-9167-3155b4a5ced8',
    networkName: 'rinkeby',
    siteTitle: 'Acme Wine',
    siteDescription: 'All wines are available for purchase and the ownership can be verified on the blockchain',
    stripeKey: 'pk_test_kn9nsrfRpCrCoGWCFDkeoGK3',
    stripeCheckoutImage: 'https://stripe.com/img/documentation/checkout/marketplace.png'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  if (process.env.BRANDED_CHECKOUT) {
    ENV.brandedCheckout = process.env.BRANDED_CHECKOUT;
  }

  if (process.env.BITSKI_CLIENT_ID) {
    ENV.bitskiClientId = process.env.BITSKI_CLIENT_ID;
  }

  if (process.env.SITE_TITLE) {
    ENV.siteTitle = process.env.SITE_TITLE;
  }

  if (process.env.SITE_DESCRIPTION) {
    ENV.siteDescription = process.env.SITE_DESCRIPTION;
  }

  if (process.env.STRIPE_KEY) {
    ENV.stripeKey = process.env.STRIPE_KEY;
  }

  if (process.env.STRIPE_IMAGE_URL) {
    ENV.stripeCheckoutImage = process.env.STRIPE_IMAGE_URL;
  }

  return ENV;
};
