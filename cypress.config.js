const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  viewportWidth: 1280,
  viewportHeight: 720,
  fixturesFolder: "cypress/fixtures",
  env: {
    username: "7503489179",
    password: "1234kanha",
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://localhost:3000",
  },
});
