const Sales = require('../services/salesServices');

const addSale = async (req, res, next) => {
  const sales = req.body;

  const sale = await Sales.addSale(sales);

  if (sale.error) return next(sale.error);

  return res.status(201).json(sale);
};

const getAll = async (_req, res) => {
  const sales = await Sales.getAll();

  return res.status(200).json(sales);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await Sales.getById(id);

  if (sale.error) return next(sale.error);

  return res.status(200).json(sale[0]);
};

module.exports = {
  addSale,
  getAll,
  getById,
};
