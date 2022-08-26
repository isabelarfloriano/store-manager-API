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

const deleteSale = async (id) => {
  const sale = await Sales.getById(id);

  if (!sale) {
    return {
      error: {
        code: 'notFound',
        message: 'Sale not found',
      },
    };
  }

  return Sales.deleteSale(id);
};

const updateSale = async (id, sales) => {
  const sold = await Sales.getById(id);
  if (!sold) return { error: { code: 'notFound', message: 'Sale not found' } };

  const products = await Products.getAll();
  const haveTheProduct = sales.every((sale) => products.map((p) => p.id).includes(sale.productId));
  if (!haveTheProduct) return { error: { code: 'notFound', message: 'Product not found' } };
  
  return Sales.updateSale(id, sales);
};

module.exports = {
  addSale,
  getAll,
  getById,
  deleteSale,
  updateSale,
};