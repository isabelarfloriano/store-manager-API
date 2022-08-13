const Products = require('../models/productsModel');

const getAll = async () => Products.getAll();

module.exports = {
  getAll,
};