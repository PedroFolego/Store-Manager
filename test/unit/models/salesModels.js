const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('M - Busca todos as vendas do BD', () => {
  describe('Quando não existe vendas', () => {
    const resultFake = [[]];

    before(() => {
      sinon.stub(connection, 'execute')
        .resolves(resultFake)
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await salesModel.getSalesModel();

      expect(result).to.be.an('array');
    })
    it('retorna um array vazio', async () => {
      const result = await salesModel.getSalesModel();
  
        expect(result).to.be.empty;
    })
  })
  describe('Quando existe produtos no BD', () => {
    const resultFake =   [[
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
      sinon.stub(connection, 'execute')
      .resolves(resultFake)
    })
    after(() => {
      connection.execute.restore();
    })
    it('retorna um array', async () => {
      const result = await salesModel.getSalesModel();
      
      expect(result).to.be.an('array');
    })
    it('o array não está vazio', async () => {
      const result = await salesModel.getSalesModel();
      
      expect(result).to.be.not.empty;
    })
    it('o array possui objetos', async () => {
      const [result] = await salesModel.getSalesModel();
      
      expect(result).to.be.an('object');
    })
    it('existe atributos iguais a date, productId e quantity', async () => {
      const [result] = await salesModel.getSalesModel();
      
      expect(result).to.be.includes.all.keys(
        'date',
        'productId',
        'quantity'
      )
    })
  })
})

describe('Busca produto pelo ID', () => {
  const resultFake =   [
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
  ];

  before(() => {
    sinon.stub(connection, 'execute')
      .resolves(resultFake)
  })

  after(() => {
    connection.execute.restore();
  })

  it('retorna um object', async () => {
    const result = await salesModel.getSaleIDModel(1);
    expect(result).to.be.an('object');
  })
  it('retorna um object correto', async () => {
    const result = await salesModel.getSaleIDModel(1);
    
    expect(result).to.be.equal(resultFake[0]);
  })
})

describe('Adiciona Venda', () => {
  const resultFake = [{ insertId: 1 }];

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
    sinon.stub(connection, 'execute')
      .resolves(resultFake)
  })

  after(() => {
    connection.execute.restore();
  })
  it('retorna um object', async () => {
    const result = await salesModel.postSaleModel(sales);
    expect(result).to.be.an('object');
  })
  it('retorna um object correto', async () => {
    const result = await salesModel.postSaleModel(sales);
    expect(result).to.be.eql({ id: 1, itemsSold: sales });
  })
})