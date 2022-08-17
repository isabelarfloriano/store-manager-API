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
    Sinon.stub(productsServices, 'getAll').resolves([resultExecute]);

    await productsControllers.getAll(request, response);
    eexpect(response.json.calledWith([
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
  it('Should response with status 200 just once | CONTROLLERS', async () => {
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