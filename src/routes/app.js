'use strict';

const express = require('express');

module.exports = async (app) => {

  /**
   * Create a new router instance that the application routes will be
   * registered to. This router will handle the index and about pages.
   */

  let router = new express.Router();

  // When the root url is requested, render and return the "index" handlebars template.
  router.get('/', (req, res) => {
    // Create data to be used in the handlebars template.
    let data = {
      title: '12 Days of Node.js',
      message: 'Welcome to the 12 Days of Node.js.'
    };

    // tell express to render the "index" handlebars template with the provided "data"
    res.render('index', data);
  });

  // When the "about" url is requested, render and return the "about" handlebars template.
  router.get('/about', (req, res) => {
    // Create data to be used in the handlebars template.
    let data = {
      title: '12 Days of Node.js',
      description: 'This application is built as an example for the 12 Days of Node.js blog series at <a href="https://doowb.com">doowb.com</a>.'
    };

    // tell express to render the "about" handlebars template with the provided "data"
    res.render('about', data);
  });

  return router;
};
