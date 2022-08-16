const express = require('express');
const rescue = require('express-rescue');
const productsControllers = require('../controllers/productsControllers');
const productsValidation = require('../middlewares/productsValidation');

const productsRoute = express.Router();

const nameValidate = productsValidation.nameValidation;

productsRoute.get('/', rescue(productsControllers.getAll));
productsRoute.get('/:id', rescue(productsControllers.getById));
productsRoute.post('/', nameValidate, rescue(productsControllers.createProduct));

module.exports = productsRoute;