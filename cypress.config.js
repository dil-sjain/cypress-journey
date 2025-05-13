const { defineConfig } = require('cypress')
require('dotenv').config();

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads',
  video: true,
  trashAssetsBeforeRuns: true,
  defaultCommandTimeout: 40000,
  requestTimeout: 30000,
  responseTimeout: 30000,
  pageLoadTimeout: 80000,
  retries: {
    runMode: 2,
    openMode: 0,
  },

  env: {
    user_email: process.env.user_email,
    user_password: process.env.user_password,
    BASE_URL: process.env.BASE_URL,
  },
  

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
