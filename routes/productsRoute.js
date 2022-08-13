const express = require('express');
const productsControllers = require('../controllers/productsControllers');

const productsRoute = express.Router();

productsRoute.get('/', productsControllers.getAll);
productsRoute.get('/:id', productsControllers.getById);

module.exports = productsRoute;