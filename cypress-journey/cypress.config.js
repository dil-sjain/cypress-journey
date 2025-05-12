const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  defaultCommandTimeout: 10000, // 10 seconds for commands like get, click, type
  pageLoadTimeout: 30000, // 30 seconds for page load
  requestTimeout: 30000, // 30 seconds for API requests
  responseTimeout: 30000, // 30 seconds for API responses
  viewportWidth: 1280,
  viewportHeight: 720,
  fixturesFolder: "cypress/fixtures",
  video: true, //Turn video recording ON
  videosFolder: "cypress/videos", // Default location for videos

  env: {
    mobileNum: process.env.MOBILENUM,
    password: process.env.PASSWORD,
    invalidPassword: process.env.INVALIDPASSWORD,
    unregisteredUser: process.env.UNREGISTEREDUSER,
    base_url: process.env.BASE_URL,
  },

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
  },
});
