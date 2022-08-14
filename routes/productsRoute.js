const express = require('express');
const rescue = require('express-rescue');
const productsControllers = require('../controllers/productsControllers');

const productsRoute = express.Router();

productsRoute.get('/', rescue(productsControllers.getAll));
productsRoute.get('/:id', rescue(productsControllers.getById));

module.exports = productsRoute;