// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const Importer = require('mysql-import');
const  my = require('mysql2');

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    'teste': () => {
      const con = my.createConnection({host: '127.0.0.1', user: 'root', password: '12345678', database: 'cookmaster'});
      return con;
    }
  })
}

