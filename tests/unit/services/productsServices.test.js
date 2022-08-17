const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsServices = require('../../../services/productsServices');

describe('Test the function that lists all products', () => {
  afterEach(() => {
    Sinon.restore();
  })
  it('Should return an array', async () => {
    const resultExecute = []
    Sinon.stub(productsModel, 'getAll').resolves([resultExecute]);

    const products = await productsServices.getAll();
    expect(products).to.be.an('array');
  })
  it('Array must not be empty', async () => {
    const resultExecute = []
    Sinon.stub(productsModel, 'getAll').resolves([resultExecute]);

    const products = await productsServices.getAll();
    expect(products).to.be.empty;
  })
  it('Array must be empty', async () => {
    const resultExecute = [{
      "id": 1,
      "name": "Martelo de Thor",
    }]
    Sinon.stub(productsModel, 'getAll').resolves([resultExecute]);

    const products = await productsServices.getAll();
    expect(products).to.be.not.empty;
  })
  it('Array must contain objects', async () => {
    const resultExecute = [{
      "id": 1,
      "name": "Martelo de Thor",
    }]
    Sinon.stub(productsModel, 'getAll').resolves([resultExecute]);

    const products = await productsServices.getAll();
    expect(products).to.be.an('object');
  })
  it('Objects inside array must contain "id" and "name" properties', async () => {
    const resultExecute = [{
      "id": 1,
      "name": "Martelo de Thor",
    }]
    Sinon.stub(productsModel, 'getAll').resolves([resultExecute]);

    const products = await productsServices.getAll();
    expect(products[0]).to.all.keys('name', 'id')
  })
});