const express = require('express');
const rescue = require('express-rescue');
const salesControllers = require('../controllers/salesControllers');
const salesValidation = require('../middlewares/salesValidation');

const salesRoute = express.Router();

const saleValidate = salesValidation.salesValidation;

salesRoute.post('/', saleValidate, rescue(salesControllers.addSale));
salesRoute.get('/', rescue(salesControllers.getAll));
salesRoute.get('/:id', rescue(salesControllers.getById));
salesRoute.delete('/:id', rescue(salesControllers.deleteSale));
salesRoute.put('/:id', saleValidate, rescue(salesControllers.updateSale));

module.exports = salesRoute;