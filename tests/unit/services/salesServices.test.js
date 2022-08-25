const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesServices = require('../../../services/salesServices');
const productsModel = require('../../../models/productsModel');

describe('Test the function that lists all sales | SERVICES', () => {
  afterEach(() => {
    Sinon.restore();
  })
  it('Should return an array', async () => {
    const resultExecute = []
    Sinon.stub(salesModel, 'getAll').resolves([resultExecute]);

    const sales = await salesServices.getAll();
    expect(sales).to.be.an('array');
  })
  it('Array must not be empty', async () => {
    const resultExecute = []
    Sinon.stub(salesModel, 'getAll').resolves(resultExecute);

    const sales = await salesServices.getAll();
    expect(sales).to.be.empty;
  })
  it('Array must be empty', async () => {
    const resultExecute = [{
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2,
    }]
    Sinon.stub(salesModel, 'getAll').resolves(resultExecute);

    const sales = await salesServices.getAll();
    expect(sales).to.be.not.empty;
  })
  it('Array must contain objects', async () => {
    const resultExecute = [{
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2,
    }]
    Sinon.stub(salesModel, 'getAll').resolves(resultExecute);

    const sales = await salesServices.getAll();
    expect(sales[0]).to.be.an('object');
  })
  it('Objects inside array must contain right properties', async () => {
    const resultExecute = [{
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2,
    }]
    Sinon.stub(salesModel, 'getAll').resolves(resultExecute);

    const sales = await salesServices.getAll();
    expect(sales[0]).to.all.keys('saleId','date', 'productId', 'quantity');
  })
});

describe('Test the function that list a sale by specific id | SERVICES', () => {
  afterEach(() => {
    Sinon.restore();
  })
  it('Should return an object with correct data', async () => {
    const resultExecute = [{
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2,
    }]
    Sinon.stub(salesModel, 'getById').resolves(resultExecute);

    const sale = await salesServices.getById('1');
    expect(sale[0]).to.be.an('object');
    expect(sale[0]).to.include.all.keys('date', 'productId', 'quantity');
  })
  it('Should return error object if id was not found', async () => {
    const resultExecute = null;
    Sinon.stub(salesModel, 'getById').resolves(resultExecute);

    const sale = await salesServices.getById('1234');
    expect(sale).to.be.an('object');
    expect(sale.error).to.include.all.keys('code', 'message');
  })
});

describe('Test the function that add a sale to database | SERVICE', () => {
  afterEach(() => {
    Sinon.restore();
  })
  it('Should return an object with correct data in case of success', async () => {
    const resultExecute = {
      "id": 3,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    }
    Sinon.stub(salesModel, 'addSale').resolves(resultExecute);

    const sale = await salesServices.addSale([
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]);
    expect(sale).to.be.an('object');
    expect(sale).to.include.all.keys('id', 'itemsSold');
    expect(sale.itemsSold).to.be.an('array');
    expect(sale.itemsSold[0]).to.be.not.empty;
  })
  it('Should return a error object if the product was not found', async () => {
    const products = [{
      "id": 1,
      "name": "Martelo de Thor",
    },
    {
      "id": 2,
      "name": "Traje de encolhimento",
    }]
    Sinon.stub(productsModel, 'getAll').resolves(products);
    const resultExecute = [{
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    }]
    Sinon.stub(salesModel, 'addSale').resolves(resultExecute);

    const sale = await salesServices.addSale([
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 3,
        "quantity": 5
      }
    ]);
    expect(sale).to.be.an('object');
    expect(sale.error).to.include.all.keys('code', 'message');
  })
});