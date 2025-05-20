const { defineConfig } = require('cypress')
require('dotenv').config();

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  fixturesFolder: 'cypress/fixtures',
  video:true,
  videoCompression: true,
  videosFolder: 'cypress/videos',

  env: {
    username: process.env.user_email,
    password: process.env.user_password,
    BASE_URL: process.env.BASE_URL,
  },

 
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
  },
})
