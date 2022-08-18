const Sales = require('../services/salesServices');

const addSale = async (req, res, next) => {
  const { sales } = req.body;

  const sale = await Sales.addSale(sales);

  if (sale.error) return next(sale.error);

  return res.status(201).json(sale[0]);
};

module.exports = {
  addSale,
};