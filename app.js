'use strict';

const express = require('express');

/**
 * Factory function for creating a new application instance.
 * This is exported as a function to allow creating instances with
 * different configurations if necessary for testing.
 *
 * @return {Object} Returns an instance of an [express][] application.
 */

async function create() {
  let app = express();

  app.use((req, res) => {
    res.send('hello world');
  });

  return app;
};

module.exports = { create };
