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

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const product = await Products.updateProduct(id, name);

  if (product.error) return next(product.error);

  return res.status(200).json({ id, name });
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const product = await Products.deleteProduct(id);

  if (product) return next(product.error);

  return res.status(204).end();
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const product = await Products.searchProduct(q);
  // console.log(product);

  return res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
}; 