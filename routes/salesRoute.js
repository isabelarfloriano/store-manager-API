const express = require('express');
const rescue = require('express-rescue');
const salesControllers = require('../controllers/salesControllers');
const salesValidation = require('../middlewares/salesValidation');

const salesRoute = express.Router();

const saleValidate = salesValidation.salesValidation;

salesRoute.post('/', saleValidate, rescue(salesControllers.addSale));

module.exports = salesRoute;