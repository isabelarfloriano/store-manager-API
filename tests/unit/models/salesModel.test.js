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
  });
});