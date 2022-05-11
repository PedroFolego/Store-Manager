const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('S - Busca todos os vendas do BD', () => {
  describe('Quando não existe vendas', () => {
    const resultFake = [];
    
    before(() => {
      sinon.stub(salesModel, 'getSalesModel')
      .resolves(resultFake)
    })
    
    after(() => {
      salesModel.getSalesModel.restore();
    })
    it('retorna um array', async () => {
      const result = await salesService.getSalesService();
      
      expect(result).to.be.an('array');
    })
    it('retorna um array vazio', async () => {
      const result = await salesService.getSalesService();
  
        expect(result).to.be.empty;
    })
  })
  describe('Quando existe produtos', () => {
    const resultFake = [[
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ]]

    before(() => {
      sinon.stub(salesModel, 'getSalesModel')
      .resolves(resultFake)
    })
    after(() => {
      salesModel.getSalesModel.restore();
    })

    it('retorna um array', async () => {
      const result = await salesService.getSalesService();

      expect(result).to.be.an('array');
    })
    it('o array não está vazio', async () => {
      const result = await salesService.getSalesService();
      
      expect(result).to.be.not.empty;
    })
    it('o array possui objetos', async () => {
      const [result] = await salesService.getSalesService();
      expect(result[0]).to.be.an('object');
    })
    it('existe atributos iguais a date, productId e quantity', async () => {
      const [result] = await salesService.getSalesService();
      
      expect(result[0]).to.be.includes.all.keys(
        'date',
        'productId',
        'quantity'
      )
    })
  })
})

describe('Busca produto pelo ID', () => {
  const fakeResult = [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ]
  before(() => {
    sinon.stub(salesModel, 'getSaleIDModel')
      .resolves(fakeResult)
  })
  after(() => {
    salesModel.getSaleIDModel.restore();
  })
  it('retorna um objeto', async () => {
    const [result] = await salesService.getSaleIDService(1);
    expect(result).to.be.an('object');
  })
  it('retorna um object correto', async () => {
    const [result] = await salesService.getSaleIDService(1);
    
    expect(result).to.be.equal(fakeResult[0]);
  })
})

describe('Adiciona Venda', () => {
  const fakeResult =   {
    "id": 1,
    "itemsSold": [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]
  };

  const sales = [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]

  before(() => {
    sinon.stub(salesModel, 'postSaleModel')
      .resolves(fakeResult)
  })
  after(() => {
    salesModel.postSaleModel.restore();
  })
  it('retorna um objeto', async () => {
    const result = await salesService.postSaleService(sales);
    expect(result).to.be.an('object');
  })
  it('retorna um object correto', async () => {
    const result = await salesService.postSaleService(sales);
    
    expect(result).to.be.eql(fakeResult);
  })
})