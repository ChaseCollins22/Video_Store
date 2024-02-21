const bcrypt = require('bcrypt');

const validatePassword = async (password, passwordHash) => bcrypt.compare(password, passwordHash);

module.exports = {
  validatePassword,
};
