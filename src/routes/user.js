const express = require('express');
const validateUser = require('../validation/userValidator');
const userService = require('../services/userService');
const authMiddlware = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await userService.getAllUsers();
  res.send(users);
});

router.get('/me', authMiddlware, async (req, res) => {
  const user = await userService.getUserById(req.user._id);
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingUser = await userService.getUserByEmail(req.body.email);
  if (existingUser) return res.status(400).send('User already exists.');

  const userData = req.body;
  const newUser = await userService.createUser(userData);

  const token = newUser.generateAuthToken();

  res.header('x-auth-token', token).send({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  });
});

module.exports = router;
