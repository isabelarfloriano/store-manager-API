const Sales = require('../models/salesModel');
const Products = require('../models/productsModel');

const addSale = async (sales) => {
  const products = await Products.getAll();
  const haveTheProduct = sales.filter((sale) => products.filter(
    (prod) => prod.productId === sale.productId,
  ));

  if (haveTheProduct.length > 0) {
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

module.exports = {
  addSale,
};