const Products = require('../models/productsModel');

const getAll = async () => Products.getAll();

// Usando de base o exercicio do course 23.2 para o lógica de ERRO
const getById = async (productId) => {
  const products = await Products.getById(productId);

  if (!products) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }

  return products;
};

const createProduct = async (name) => Products.createProduct(name);

const updateProduct = async (id, name) => {
  const product = await Products.getById(id);

  if (!product) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }

  return Products.updateProduct(id, name);
};

const deleteProduct = async (id) => {
  const product = await Products.getById(id);

  if (!product) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }

  return Products.deleteProduct(id);
}; 

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};