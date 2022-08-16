const Products = require('../services/productsServices');

const getAll = async (_req, res) => {
  const products = await Products.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const products = await Products.getById(id);

  if (products.error) return next(products.error);  

  return res.status(200).json(products[0]);
};

const createProduct = async (_req, res) => {
  const { name } = _req.body;
  const newProduct = await Products.createProduct(name);

  return res.status(201).json(newProduct);
};

module.exports = {
  getAll,
  getById,
  createProduct,
}; 