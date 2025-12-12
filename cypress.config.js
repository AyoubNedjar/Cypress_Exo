const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "h17qf3",
  e2e: {
    baseUrl: 'https://shop.mango.com/be/fr/h/femme',
    setupNodeEvents(on, config) {
      // ici on laissera plus tard les éventuels events
    },
    viewportWidth: 915,
    viewportHeight: 729,
    
  },
});
