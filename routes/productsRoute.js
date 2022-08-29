const express = require('express');
const rescue = require('express-rescue');
const productsControllers = require('../controllers/productsControllers');
const productsValidation = require('../middlewares/productsValidation');

const productsRoute = express.Router();

const nameValidate = productsValidation.nameValidation;

productsRoute.get('/search', rescue(productsControllers.searchProduct));
productsRoute.get('/', rescue(productsControllers.getAll));
productsRoute.get('/:id', rescue(productsControllers.getById));
productsRoute.post('/', nameValidate, rescue(productsControllers.createProduct));
productsRoute.put('/:id', nameValidate, rescue(productsControllers.updateProduct));
productsRoute.delete('/:id', rescue(productsControllers.deleteProduct));

module.exports = productsRoute;
