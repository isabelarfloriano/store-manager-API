const Products = require('../services/productsServices');

const getAll = async (_req, res) => {
  const products = await Products.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const products = await Products.findById(id);

  if (products.error) return next(products.error);

  return res.status(200).json(products);
};

module.exports = {
  getAll,
  getById,
}; 