const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://shop.mango.com/be/fr/h/femme',
    setupNodeEvents(on, config) {
      // ici on laissera plus tard les éventuels events
    },
    "chromeWebSecurity": false
  },
});
