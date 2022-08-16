const { expect } = require('chai');
const { describe } = require('mocha');

const productsModel = require('../../../models/productsModel');

describe('Test the function that lists all products', () => {
  it('Should return an array', async () => {
    const products = await productsModel.getAll();
    expect(products).to.be.an('array');
  })
});