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

describe('Busca produto pelo ID', () => {
  const fakeProduct = [{
    "id": 1,
    "name": "produto A",
    "quantity": 10
  }]
  before(() => {
    sinon.stub(productsModel, 'getProdIDModel')
      .resolves(fakeProduct)
  })
  after(() => {
    productsModel.getProdIDModel.restore();
  })
  it('retorna um objeto', async () => {
    const result = await productsService.getProdIDService(1);
    expect(result).to.be.an('object');
  })
  it('retorna um object correto', async () => {
    const result = await productsService.getProdIDService(1);
    
    expect(result).to.be.equal(fakeProduct[0]);
  })
})

describe('Cria um produto', () => {
  const name = 'produto A';
  const quantity = 10;
  const fakeProduct = {
    "id": 1,
    "name": "produto A",
    "quantity": 10
  }
  before(() => {
    sinon.stub(productsModel, 'postProductModel')
      .resolves(fakeProduct)
  })
  after(() => {
    productsModel.postProductModel.restore();
  })
  it('retorna um objeto', async () => {
    const result = await productsService.postProductService(name, quantity);
    expect(result).to.be.an('object');
  })
  it('retorna um object correto', async () => {
    const result = await productsService.postProductService(name, quantity);
    
    expect(result).to.be.eql(fakeProduct);
  })
})