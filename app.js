'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');

const routes = require('./src/routes');

/**
 * Factory function for creating a new application instance.
 * This is exported as a function to allow creating instances with
 * different configurations if necessary for testing.
 *
 * @return {Object} Returns an instance of an [express][] application.
 */

async function create() {
  let app = express();

  /**
   * Configure the view engine for rendering Handlebars templates with
   * an extension of `.hbs` in the `src/views` folder.
   */

  app.engine('hbs', consolidate.handlebars);
  app.set('views', './src/views');
  app.set('view engine', 'hbs');

  app.use(bodyParser.raw());
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(bodyParser.urlencoded());

  /**
   * Register the main application routes at the "root" of the express app.
   */

  app.use('/', await routes.app(app));
  app.use('/api', await routes.api(app));

  return app;
};

module.exports = { create };
