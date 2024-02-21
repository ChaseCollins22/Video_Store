const express = require('express');
const rentalService = require('../services/rentalService');
const validateRental = require('../validation/rentalValidator');

const router = express.Router();

// Get all rentals
router.get('/', async (req, res) => {
  const allRentals = await rentalService.getAllRentals();
  return res.json(allRentals);
});

// Get a single rental by ID
router.get('/:id', async (req, res) => {
  try {
    const rentalId = req.params.id;
    const rental = await rentalService.getRentalById(rentalId);
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');

    return res.json(rental);
  } catch (error) {
    res.status(500).send('Error retrieving rental');
  }
});

// Create a new rental
router.post('/', async (req, res) => {
  try {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const rentalData = req.body;
    const newRental = await rentalService.createRental(rentalData);
    console.log(newRental);
    res.send(newRental);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update an existing rental
router.put('/:id', async (req, res) => {
  try {
    const rentalId = req.params.id;
    const rentalData = req.body;
    const updatedRental = await rentalService.updateRentalById(rentalId, rentalData);
    res.send(updatedRental);
  } catch (error) {
    res.status(500).send('Error updating rental');
  }
});

// Delete a rental
router.delete('/:id', async (req, res) => {
  try {
    const rentalId = req.params.id;
    const deletedRental = await rentalService.deleteRentalById(rentalId);
    res.send(deletedRental);
  } catch (error) {
    res.status(500).send('Error deleting rental');
  }
});

module.exports = router;
