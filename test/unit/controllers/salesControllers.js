const { expect } = require('chai');
const sinon = require('sinon');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');


describe('C - Busca todos os produtos do BD', () => {
  describe('Quando não existe produtos', () => {
    const response = {};
    const request = {};
    const resultFake = [];
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getSalesService')
      .resolves(resultFake)
    })
    after(() => {
      salesService.getSalesService.restore();
    })

    it('é retornado um status 200', async () => {
      await salesController.getSalesController(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
    it('é retornado um metodo json com um array', async () => {
      await salesController.getSalesController(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })
  describe('Quando não existe produtos', () => {
    const response = {};
    const request = {};
    const resultFake = [
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
    ];
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getSalesService')
      .resolves(resultFake)
    })
    after(() => {
      salesService.getSalesService.restore();
    })

    it('é retornado um status 200', async () => {
      await salesController.getSalesController(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
    it('é retornado um metodo json com um array', async () => {
      await salesController.getSalesController(request, response);
      expect(response.json.calledWith(resultFake)).to.be.equal(true);
    })
  })
})
describe('Busca venda pelo ID', () => {
  const response = {};
  const request = {};
  const next = () => {};
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
    request.params = { id: 1 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSaleIDService')
    .resolves(resultFake)
  })
  after(() => {
    salesService.getSaleIDService.restore();
  })
  it('é retornado um status 200', async () => {
    await salesController.getSalesIDController(request, response, next);
    expect(response.status.calledWith(200)).to.be.equal(true);
  })
  it('é retornado um metodo json com um array', async () => {
    await salesController.getSalesIDController(request, response, next);
    expect(response.json.calledWith(resultFake)).to.be.equal(true);
  })
})
describe('Cria uma venda', () => {
  const response = {};
  const request = {};
  const next = () => {};
  const resultFake = {
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
  before(() => {
    request.body =   [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesService, 'postSaleService')
    .resolves(resultFake)
  })
  after(() => {
    salesService.postSaleService.restore();
  })
  it('é retornado um status 200', async () => {
    await salesController.postSaleController(request, response, next);
    expect(response.status.calledWith(201)).to.be.equal(true);
  })
  it('é retornado um metodo json com um array', async () => {
    await salesController.postSaleController(request, response, next);
    expect(response.json.calledWith(resultFake)).to.be.equal(true);
  })
})
describe('Atualiza uma venda', () => {
  const response = {};
  const request = {};
  const next = () => {};
  const resultFake =   {
    "saleId": 1,
    "itemUpdated": [
      {
        "productId": 1,
        "quantity": 6
      }
    ]
  };
  before(() => {
    request.params = { id: 1 }
    request.body = [
      {
        "productId": 1,
        "quantity": 6
      }
    ];
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesService, 'putSaleService')
    .resolves(resultFake)
  })
  after(() => {
    salesService.putSaleService.restore();
  })
  it('é retornado um status 200', async () => {
    await salesController.putSaleController(request, response, next);
    expect(response.status.calledWith(200)).to.be.equal(true);
  })
  it('é retornado um metodo json com um array', async () => {
    await salesController.putSaleController(request, response, next);
    expect(response.json.calledWith(resultFake)).to.be.equal(true);
  })
})
