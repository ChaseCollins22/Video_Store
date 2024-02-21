const mongoose = require('mongoose');
const { Rental } = require('../models/rentalSchema');
const { Movie } = require('../models/movieSchema');
const { Customer } = require('../models/customerSchema');

// Create a new rental
const createRental = async (rental) => {
  const { customerId, movieId, rentalData } = rental;

  const customer = await Customer
    .findById(customerId)
    .select('name phone isGold');
  if (!customer) throw new Error('Invalid customer');

  const movie = await Movie
    .findById(movieId)
    .select('title dailyRentalRate numberInStock');
  if (!movie) throw new Error('Invalid movie');
  if (movie.numberInStock === 0) throw new Error('Movie not in stock');

  const newRental = new Rental(
    {
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
        isGold: customer.isGold,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
      rentalData,
    },
  );

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await newRental.save();

    movie.numberInStock -= 1;
    await movie.save();

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  return newRental;
};

// Read all rentals
const getAllRentals = async () => Rental.find();

// Read a rental by ID
const getRentalById = async (id) => {
  const rental = await Rental.findById(id);
  return rental;
};

// Update a rental by ID
const updateRentalById = async (id, updatedRental) => {
  const rental = await Rental.findById(id);
  if (rental) {
    rental.set(updatedRental);
    return rental.save();
  }
};

// Delete a rental by ID
const deleteRentalById = async (id) => {
  const rental = await Rental.findById(id);
  if (rental) {
    await rental.deleteOne();
  }
};

module.exports = {
  createRental,
  getAllRentals,
  getRentalById,
  updateRentalById,
  deleteRentalById,
};
