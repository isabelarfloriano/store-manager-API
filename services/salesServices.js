const Sales = require('../models/salesModel');
const Products = require('../models/productsModel');

const addSale = async (sales) => {
  const products = await Products.getAll();
  const haveTheProduct = sales.every((sale) => products.map((p) => p.id).includes(sale.productId));

  if (!haveTheProduct) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }

  const sold = await Sales.addSale(sales);
  return sold;
};

const getAll = async () => Sales.getAll();

const getById = async (id) => {
  const sale = await Sales.getById(id);

  if (!sale) {
    return {
      error: {
        code: 'notFound',
        message: 'Sale not found',
      },
    };
  }

  return sale;
};

module.exports = {
  addSale,
  getAll,
  getById,
};