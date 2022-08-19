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
    const next = Sinon.stub().resolves();
    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
    const resultExecute = [{
      "id": 1,
      "name": "Martelo de Thor",
      }]
    Sinon.stub(productsServices, 'getById').resolves(resultExecute);

    await productsControllers.getById(request, response, next);
    expect(response.json.calledWith(
      {
        "id": 1,
        "name": "Martelo de Thor",
      }
    )).to.be.equal(true);
  })
  it('Should response with status 200 just once', async () => {
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
        message: 'Product not found',
      },
    };
    Sinon.stub(productsServices, 'getById').resolves(resultExecute);

    await productsControllers.getById(request, response, next);
    expect(next.calledWith(resultExecute.error)).to.be.equal(true);
  })
});

describe('Test the function that add product to database | CONTROLLERS', () => {
  afterEach(() => {
    Sinon.restore();
  })
  it('Should be called an object with status 201 just once', async () => {
    const request = { body: { name: "ProdutoX" } };
    const response = {};

    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
    const resultExecute = {
      "id": 4,
      "name": "ProdutoX",
    }
    Sinon.stub(productsServices, 'createProduct').resolves(resultExecute);

    await productsControllers.createProduct(request, response);
    expect(response.json.calledWith(
    {
      "id": 4,
      "name": "ProdutoX",
    }
    )).to.be.equal(true);
    expect(response.status.calledWith(201)).to.be.equal(true);
    expect(response.status.calledOnce).to.be.true;
  })
});