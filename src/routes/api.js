'use strict';

const express = require('express');
const controllers = require('../controllers');

module.exports = async (app) => {

  /**
   * Create a new router instance that the api routes will be
   * registered to. This router will handle the rest API CRUD operations
   */

  let router = new express.Router();

  /**
   * (C)reate a new user using the POST http method and the '/users' route.
   * This route handles getting the user properties from the request body
   * and passing them along to the controller which handles the logic of creating a new user.
   */

  router.post('/users', async (req, res) => {
    let { username, email, password } = req.body;
    let user = await controllers.users.create(username, email, password);
    res.send(user);
  });

  /**
   * (R)ead a list of users using the GET http method and the '/users' route.
   * This route handles getting the filter or query properties from the request and passing
   * them along to the controller which handles the logic of getting the list of users.
   */

  router.get('/users', async (req, res) => {
    let { page, limit } = req.query;
    let users = await controllers.users.getAll({ page, limit });
    res.send(users || []);
  });

  /**
   * (R)ead a single user using the GET http method and the '/user/:username' route,
   * where ':username' is a parameter specifying which user to get based on their username.
   * This route handles getting the "username" parameter from the request and passing
   * it along to the controller which handles the logic of finding and returning
   * the user from the provided "username".
   */

  router.get('/users/:username', async (req, res) => {
    let { username } = req.params;
    let user = await controllers.users.get(username);
    res.send(user || {});
  });

  /**
   * (U)pdate a single user using the PUT http method and the '/user/:username' route,
   * where ':username' is the parameter specifying which user to update based on their username.
   * This route handles getting the "username" parameter and the updated user properties
   * from the request body and passing them along to the controller which handles the logic
   * of updating the user.
   */

  router.put('/users/:username', async (req, res) => {
    let { username } = req.params;
    let { email, password } = req.body;
    let user = await controllers.users.update(username, { email, password });
    res.send(user);
  });

  /**
   * (D)elete a single user using the DELETE http method and the '/user/:username' route,
   * where ':username' is the parameter specifying which user to delete based on their username.
   * This route handles getting the "username" parameter and passing it along to the controller
   * which handles the log of deleting the user.
   */

  router.delete('/users/:username', async (req, res) => {
    let { username } = req.params;
    let user = await controllers.users.remove(username);
    res.send(user || {});
  });

  return router;
};
