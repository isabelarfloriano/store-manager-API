const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('Test the function that lists all sales | MODEL', () => { 
  afterEach(() => {
    Sinon.restore();
  })
  it('Should return an array', async () => {
    const resultExecute = []
    Sinon.stub(connection, 'execute').resolves([resultExecute]);

    const sales = await salesModel.getAll();
    expect(sales).to.be.an('array');
  })
  it('Array must not be empty', async () => {
    const resultExecute = []
    Sinon.stub(connection, 'execute').resolves([resultExecute]);

    const sales = await salesModel.getAll();
    expect(sales).to.be.empty;
  })
  it('Array must be empty', async () => {
    const resultExecute = [{
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2,
    }]
    Sinon.stub(connection, 'execute').resolves(resultExecute);

    const sales = await salesModel.getAll();
    expect(sales).to.be.not.empty;
  })
  it('Array must contain objects', async () => {
    const resultExecute = [{
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2,
    }]
    Sinon.stub(connection, 'execute').resolves([resultExecute]);

    const sales = await salesModel.getAll();
    expect(sales[0]).to.be.an('object');
  })
  it('Objects inside array must contain right properties', async () => {
    const resultExecute = [{
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2,
    }]
    Sinon.stub(connection, 'execute').resolves([resultExecute]);

    const sales = await salesModel.getAll();
    expect(sales[0]).to.all.keys('saleId', 'date', 'productId', 'quantity');
  })
});