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

module.exports = {
  getAll,
  getById,
};