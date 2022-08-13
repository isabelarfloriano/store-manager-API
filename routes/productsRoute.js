const express = require('express');
const productsControllers = require('../controllers/productsControllers');

const productsRoute = express.Router();

productsRoute.get('/', productsControllers.getAll);

module.exports = productsRoute;