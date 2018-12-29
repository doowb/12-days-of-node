'use strict';

const path = require('path');

/**
 * User data-store to keep user information since this is a simple
 * JSON file and there is no need to connect to a database yet.
 */

const Store = require('data-store');

/**
 * The Users class represents a controller that can be used
 * in routes to manage users.
 */

class Users {
  constructor() {
    this.store = new Store('users', { cwd: path.resolve(__dirname, '../../tmp/data') });
  }

  /**
   * Create a new user and store it in the [data-store][].
   *
   * @param  {String} `username` The username is the unique key for a user.
   * @param  {String} `email` The user's email.
   * @param  {String} `password` The plain-text password for the user.
   * @return {Object} The user object
   */

  async create(username, email, password) {
    let user = { username, email, password };
    this.store.set(username, user);
    return { username, email };
  }

  /**
   * Get all of the users.
   *
   * @param  {Object} `options` Options to specify which users to get.
   * @return {Array} Array of users.
   */

  async getAll(options = {}) {
    let users = this.store.data;
    return Object.keys(users)
      .map(username => {
        let { email } = users[username];
        return { username, email };
      });
  }

  /**
   * Get a single user by their username.
   *
   * @param  {String} `username` The username of the user to get.
   * @return {Object} The user.
   */

  async get(username) {
    let { email } = this.store.get(username) || {};
    return { username, email };
  }

  /**
   * Update the specified user with the new properties.
   *
   * @param  {String} `username` The username of the user to update.
   * @param  {Object} `options` The properties to update on the user.
   * @return {Object} The newly updated user.
   */

  async update(username, options = {}) {
    let user = this.store.get(username) || {};
    Object.assign(user, options);
    this.store.set(username, user);
    let { email } = user;
    return { username, email };
  }

  /**
   * Remove the specified user from the [data-store][]
   *
   * @param  {String} `username` The username of the user to remove.
   * @return {Object} The removed user.
   */

  async remove(username) {
    let user = this.store.get(username) || {};
    let { email } = user;
    this.store.del(username);
    return { username, email };
  }
}

/**
 * TODO: make this a function that creates the Users controller
 */

module.exports = new Users();
