const Sales = require('../models/salesModel');
const Products = require('../models/productsModel');

const addSale = async (sales) => {
  const products = await Products.getAll();
  console.log('PRODUCTS É', products);
  console.log('SALES É', sales);
  const haveTheProduct = sales.every((sale) => products.map((p) => p.id).includes(sale.productId));
  console.log(haveTheProduct);

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

module.exports = {
  addSale,
};