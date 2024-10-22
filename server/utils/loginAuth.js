// authorises the user by checking the username and password against the database

const { getUserByUsername } = require('../models/users');
const bcrypt = require('bcrypt');

async function authenticate(username, password) {
  const user = await getUserByUsername(username);
  if (!user) {
    return false;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid ? user : false;
}

module.exports = { authenticate };