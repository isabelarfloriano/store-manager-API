const express = require('express');
const rescue = require('express-rescue');
const salesControllers = require('../controllers/salesControllers');

const salesRoute = express.Router();

salesRoute.post('/', rescue(salesControllers.addSale));

module.exports = salesRoute;