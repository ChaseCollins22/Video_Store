const express = require('express');
const validateAuth = require('../validation/authValidator');
const userService = require('../services/userService');
const authService = require('../services/authService');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Your dawg @Auth here XD');
});

router.post('/', async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const user = await userService.getUserByEmail(req.body.email);
  if (!user) return res.send('Invalid Email or Password');

  const valid = await authService.validatePassword(req.body.password, user.password);
  if (!valid) return res.send('Incorrect password');

  const token = user.generateAuthToken();

  return res.send({ token, success: true });
});

module.exports = router;
