const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');

const productsServices = require('../../../services/productsServices');
const productsControllers = require('../../../controllers/productsControllers');

describe('Test the function that lists all products | CONTROLLERS', () => {
  afterEach(() => {
    Sinon.restore();
  })
  it('Should return an array with all products objects', async () => {
    const request = {};
    const response = {};

    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
    const resultExecute = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      }];
    Sinon.stub(productsServices, 'getAll').resolves(resultExecute);

    await productsControllers.getAll(request, response);
    expect(response.json.calledWith([
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
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
        "id": 1,
        "name": "Martelo de Thor",
      }];
    Sinon.stub(productsServices, 'getAll').resolves([resultExecute]);

    await productsControllers.getAll(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.status.calledOnce).to.be.true;
  })
});

describe('Test the function that list a product by specific id | CONTROLLERS', () => {
  afterEach(() => {
    Sinon.restore();
  })
  it('Should return an object with correct data', async () => {
    const request = { params: '1' };
    const response = {};

    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
    const resultExecute = {
      "id": 1,
      "name": "Martelo de Thor",
      }
    Sinon.stub(productsServices, 'getById').resolves(resultExecute);

    const test = await productsControllers.getById(request, response);
    console.log('ATENÇÃO', test)
    expect(response.json.calledWith(
      {
        "id": 1,
        "name": "Martelo de Thor",
      }
    )).to.be.equal(true);
  })
  it('Should response with status 201 just once', async () => {
    const request = { params: '1' };
    const response = {};

    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
    const resultExecute = [{
      "id": 1,
      "name": "Martelo de Thor",
    }]
    Sinon.stub(productsServices, 'getById').resolves(resultExecute);

    await productsControllers.getById(request, response);
    expect(response.status.calledWith(201)).to.be.equal(true);
    expect(response.status.calledOnce).to.be.true;
  })
  it('Should return error object if id was not found', async () => {
    const request = { params: '1234' };
    const response = {};

    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
    const resultExecute = {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
    Sinon.stub(productsServices, 'getById').resolves(resultExecute);

    await productsControllers.getById(request, response);
    expect(product).to.be.an('object');
    expect(product.error).to.include.all.keys('message');
  })
  it('In case of error should response with status 404', async () => {
    const request = { params: '1234' };
    const response = {};

    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
    const resultExecute = {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
    Sinon.stub(productsServices, 'getById').resolves(resultExecute);

    await productsControllers.getById(request, response);
    expect(response.status.calledWith(404)).to.be.equal(true);
    expect(response.status.calledOnce).to.be.true;
  })
});