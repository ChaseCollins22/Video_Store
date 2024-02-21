const { Customer } = require('../models/customerSchema');
const validateCustomer = require('../validation/customerValidator');

const getCustomers = async () => Customer.find();

const getCustomerById = async (id) => Customer.findById(id);

const postCustomer = async ({ name, isGold, phone }) => {
  try {
    const newCustomer = new Customer({ name, isGold, phone });
    const result = await newCustomer.save();
    console.log('New customer added!: ', result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteCustomer = async (id) => {
  try {
    const deletedCustomer = await Customer.findOneAndDelete({ _id: id });
    console.log('Deleted customer: ', deletedCustomer);
    return deletedCustomer;
  } catch (error) {
    console.log(error);
  }
};

const updateCustomer = async (id, obj) => {
  try {
    const existingCustomer = await Customer.findById(id);
    existingCustomer.set(obj);

    const { _id, __v, ...customerData } = existingCustomer.toObject();
    const { error } = validateCustomer(customerData);
    if (error) return error.details[0].message;

    const updatedCustomer = await existingCustomer.save();

    return updatedCustomer;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  postCustomer,
  deleteCustomer,
  updateCustomer,
};
