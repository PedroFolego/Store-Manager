const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('S - Busca todos os produtos do BD', () => {
  describe('Quando não existe produtos', () => {
    const resultFake = [];
    
    before(() => {
      sinon.stub(productsModel, 'getProductsModel')
      .resolves(resultFake)
    })
    
    after(() => {
      productsModel.getProductsModel.restore();
    })
    it('retorna um array', async () => {
      const result = await productsService.getProductsService();
      
      expect(result).to.be.an('array');
    })
    it('retorna um array vazio', async () => {
      const result = await productsService.getProductsService();
  
        expect(result).to.be.empty;
    })
  })
  describe('Quando existe produtos', () => {
    const resultFake =   [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      }
    ]

    before(() => {
      sinon.stub(productsModel, 'getProductsModel')
      .resolves(resultFake)
    })
    after(() => {
      productsModel.getProductsModel.restore();
    })

    it('retorna um array', async () => {
      const result = await productsService.getProductsService();

      expect(result).to.be.an('array');
    })
    it('o array não está vazio', async () => {
      const result = await productsService.getProductsService();
      
      expect(result).to.be.not.empty;
    })
    it('o array possui objetos', async () => {
      const [result] = await productsService.getProductsService();
      
      expect(result).to.be.an('object');
    })
    it('existe atributos iguais a id, name e quantity', async () => {
      const [result] = await productsService.getProductsService();
      
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      )
    })
  })
})