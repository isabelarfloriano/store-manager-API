const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsServices = require('../../../services/productsServices');

describe('Test the function that lists all products | SERVICES', () => {
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
    Sinon.stub(productsModel, 'getAll').resolves(resultExecute);

    const products = await productsServices.getAll();
    expect(products).to.be.empty;
  })
  it('Array must be empty', async () => {
    const resultExecute = [{
      "id": 1,
      "name": "Martelo de Thor",
    }]
    Sinon.stub(productsModel, 'getAll').resolves(resultExecute);

    const products = await productsServices.getAll();
    expect(products).to.be.not.empty;
  })
  it('Array must contain objects', async () => {
    const resultExecute = [{
      "id": 1,
      "name": "Martelo de Thor",
    }]
    Sinon.stub(productsModel, 'getAll').resolves(resultExecute);

    const products = await productsServices.getAll();
    expect(products[0]).to.be.an('object');
  })
  it('Objects inside array must contain "id" and "name" properties', async () => {
    const resultExecute = [{
      "id": 1,
      "name": "Martelo de Thor",
    }]
    Sinon.stub(productsModel, 'getAll').resolves(resultExecute);

    const products = await productsServices.getAll();
    expect(products[0]).to.all.keys('name', 'id')
  })
});

describe('Test the function that list a product by specific id | SERVICES', () => {
  afterEach(() => {
    Sinon.restore();
  })
  it('Should return an object with correct data', async () => {
    const resultExecute = [{
      "id": 1,
      "name": "Martelo de Thor",
    }]
    Sinon.stub(productsModel, 'getById').resolves(resultExecute);

    const product = await productsServices.getById('1');
    expect(product[0]).to.be.an('object');
    expect(product[0]).to.include.all.keys('id', 'name');
  })
  it('Should return error object if id was not found', async () => {
    const resultExecute = null;
    Sinon.stub(productsModel, 'getById').resolves(resultExecute);

    const product = await productsServices.getById('1234');
    expect(product).to.be.an('object');
    expect(product.error).to.include.all.keys('code', 'message');
  })
});

describe('Test the function that add product to database | SERVICES', () => {
  afterEach(() => {
    Sinon.restore();
  })
  it('Should return an object with correct data', async () => {
    const resultExecute = {
      "id": 4,
      "name": "ProdutoX",
    }
    Sinon.stub(productsModel, 'createProduct').resolves(resultExecute);

    const product = await productsServices.createProduct({
      "name": "ProdutoX"
    });
    expect(product).to.be.an('object');
    expect(product).to.include.all.keys('id', 'name');
  })
});