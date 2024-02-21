const express = require('express');
const customerService = require('../services/customerService');
const validateCustomer = require('../validation/customerValidator');
const authMiddlware = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const allCustomers = await customerService.getCustomers();
  return res.json(allCustomers);
});

router.post('/', authMiddlware, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newCustomer = await customerService.postCustomer({ ...req.body });
  if (!newCustomer) return res.status(500).send('The customer could not be crated.');

  return res.json(newCustomer);
});

router.delete('/:id', async (req, res) => {
  const deletedCustomer = await customerService.deleteCustomer(req.params.id);
  if (!deletedCustomer) return res.status(404).send('The customer with the given ID was not found.');

  return res.json(deletedCustomer);
});

router.put('/:id', async (req, res) => {
  const updatedCustomer = await customerService.updateCustomer(req.params.id, { ...req.body });
  if (!updatedCustomer) return res.status(404).send('The customer with the given ID was not found.');

  return res.json(updatedCustomer);
});

module.exports = router;
