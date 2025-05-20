/// <reference types="cypress" />
 const dotenvPlugin= require('cypress-dotenv');

module.exports = (on, config) => {
  // You can add custom plugins here
  config=dotenvPlugin(config);
  return config;
};