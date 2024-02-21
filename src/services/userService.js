const bcrypt = require('bcrypt');
const { User } = require('../models/userSchema');

const createUser = async (userData) => {
  try {
    userData.password = await bcrypt.hash(userData.password, 10);

    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error('Failed to get user');
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error('Failed to get user');
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error('Failed to get users');
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
};
