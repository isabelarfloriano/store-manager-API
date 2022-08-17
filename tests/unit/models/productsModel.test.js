const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

// Usando de base a mentoria de revisão bloco 23

describe('Test the function that lists all products', () => {
  afterEach(() => {
    Sinon.restore();
  })
  it('Should return an array', async () => {
    const resultExecute = []
    Sinon.stub(connection, 'execute').resolves([resultExecute]);

    const products = await productsModel.getAll();
    expect(products).to.be.an('array');
  })
  it('Array must not be empty', async () => {
    const resultExecute = []
    Sinon.stub(connection, 'execute').resolves([resultExecute]);

    const products = await productsModel.getAll();
    expect(products).to.be.empty;
  })
  it('Array must be empty', async () => {
    const resultExecute = [{
      "id": 1,
      "name": "Martelo de Thor",
    }]
    Sinon.stub(connection, 'execute').resolves([resultExecute]);

    const products = await productsModel.getAll();
    expect(products).to.be.not.empty;
  })
  it('Array must contain objects', async () => {
    const resultExecute = [{
      "id": 1,
      "name": "Martelo de Thor",
    }]
    Sinon.stub(connection, 'execute').resolves([resultExecute]);

    const products = await productsModel.getAll();
    expect(products).to.be.an('object');
  })
  it('Objects inside array must contain "id" and "name" properties', async () => {
    const resultExecute = [{
      "id": 1,
      "name": "Martelo de Thor",
    }]
    Sinon.stub(connection, 'execute').resolves([resultExecute]);

    const products = await productsModel.getAll();
    expect(products[0]).to.all.keys('name', 'id')
  })
});