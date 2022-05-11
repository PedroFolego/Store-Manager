const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('M - Busca todos os produtos do BD', () => {
  describe('Quando não existe produtos', () => {
    const resultFake = [[]];

    before(() => {
      sinon.stub(connection, 'execute')
        .resolves(resultFake)
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await productsModel.getProductsModel();

      expect(result).to.be.an('array');
    })
    it('retorna um array vazio', async () => {
      const result = await productsModel.getProductsModel();
  
        expect(result).to.be.empty;
    })
  })
  describe('Quando existe produtos no BD', () => {
    const resultFake =   [[
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
    ]]

    before(() => {
      sinon.stub(connection, 'execute')
      .resolves(resultFake)
    })
    after(() => {
      connection.execute.restore();
    })
    it('retorna um array', async () => {
      const result = await productsModel.getProductsModel();
      
      expect(result).to.be.an('array');
    })
    it('o array não está vazio', async () => {
      const result = await productsModel.getProductsModel();
      
      expect(result).to.be.not.empty;
    })
    it('o array possui objetos', async () => {
      const [result] = await productsModel.getProductsModel();
      
      expect(result).to.be.an('object');
    })
    it('existe atributos iguais a id, name e quantity', async () => {
      const [result] = await productsModel.getProductsModel();
      
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      )
    })
  })
})
describe('Busca produto pelo ID', () => {
  const resultFake = [
    {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    }
  ];

  before(() => {
    sinon.stub(connection, 'execute')
      .resolves(resultFake)
  })

  after(() => {
    connection.execute.restore();
  })

  it('retorna um object', async () => {
    const result = await productsModel.getProdIDModel(1);
    expect(result).to.be.an('object');
  })
  it('retorna um object correto', async () => {
    const result = await productsModel.getProdIDModel(1);
    
    expect(result).to.be.equal(resultFake[0]);
  })
})