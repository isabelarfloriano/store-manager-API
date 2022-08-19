const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');

const salesServices = require('../../../services/salesServices');
const salesControllers = require('../../../controllers/salesControllers');

describe('Test the function that lists all sales | CONTROLLERS', () => {
  afterEach(() => {
    Sinon.restore();
  })
  it('Should return an array with all sales objects', async () => {
    const request = {};
    const response = {};

    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
    const resultExecute = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2,
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2,
      }];
    Sinon.stub(salesServices, 'getAll').resolves(resultExecute);

    await salesControllers.getAll(request, response);
    expect(response.json.calledWith([
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2,
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2,
      }]
    )).to.be.equal(true);
  })
  it('Should response with status 200 just once', async () => {
    const request = {};
    const response = {};

    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
    const resultExecute = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2,
      }];
    Sinon.stub(salesServices, 'getAll').resolves([resultExecute]);

    await salesControllers.getAll(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.status.calledOnce).to.be.true;
  })
});

describe('Test the function that list a Sale by specific id | CONTROLLERS', () => {
  afterEach(() => {
    Sinon.restore();
  })
  it('Should return an object with correct data', async () => {
    const request = { params: '1' };
    const response = {};
    const next = Sinon.stub().resolves();
    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
    const resultExecute = [{
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2,
    }]
    Sinon.stub(salesServices, 'getById').resolves(resultExecute);

    await salesControllers.getById(request, response, next);
    expect(response.json.calledWith(
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2,
      }
    )).to.be.equal(true);
  })
  it('Should response with status 200 just once', async () => {
    const request = { params: '1' };
    const response = {};

    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
    const resultExecute = [{
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2,
    }]
    Sinon.stub(salesServices, 'getById').resolves(resultExecute);

    await salesControllers.getById(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.status.calledOnce).to.be.true;
  })
  it('Checks if the error parameter is passed correctly', async () => {
    const request = { params: '1234' };
    const response = {};
    const next = Sinon.stub().resolves();
    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
    const resultExecute = {
      error: {
        code: 'notFound',
        message: 'Sale not found',
      },
    };
    Sinon.stub(salesServices, 'getById').resolves(resultExecute);

    await salesControllers.getById(request, response, next);
    expect(next.calledWith(resultExecute.error)).to.be.equal(true);
  })
});