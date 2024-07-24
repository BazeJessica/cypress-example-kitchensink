const {defineConfig} = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'http://localhost:8080'
  },
  'projectId': '4b7344',

});
