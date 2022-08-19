const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesServices = require('../../../services/salesServices');

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