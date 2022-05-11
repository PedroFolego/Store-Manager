const { expect } = require('chai');
const sinon = require('sinon');
const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

describe('C - Busca todos os produtos do BD', () => {
  describe('Quando não existe produtos', () => {
    const response = {};
    const request = {};
    const resultFake = [];
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getProductsService')
      .resolves(resultFake)
    })
    after(() => {
      productsService.getProductsService.restore();
    })

    it('é retornado um status 200', async () => {
      await productsController.getProductsController(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
    it('é retornado um metodo json com um array', async () => {
      await productsController.getProductsController(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })
  describe('Quando existe produtos', () => {
    const response = {};
    const request = {};
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
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getProductsService')
      .resolves(resultFake)
    })
    
    after(() => {
      productsService.getProductsService.restore();
    })

    it('é retornado um status 200', async () => {
      await productsController.getProductsController(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
    it('é retornado um metodo json com um array', async () => {
      await productsController.getProductsController(request, response);
      expect(response.json.calledWith(resultFake)).to.be.equal(true);
    })
  })
})

describe('Busca produto pelo ID' , () => {
  const response = {};
  const request = {};
  const next = () => {};
  const resultFake = {
      id: 2,
      name: 'Feijão',
      quantity: 30
    };

  before(() => {
    request.params = { id: 2 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, 'getProdIDService')
    .resolves(resultFake)
  })
  
  after(() => {
    productsService.getProdIDService.restore();
  })
  it('é retornado um status de 200', async () => {
    await productsController.getProdIDController(request, response, next)

    expect(response.status.calledWith(200)).to.be.equal(true);
  })
  it('é retornado um json com o produto correto', async () => {
    await productsController.getProdIDController(request, response, next)
    expect(response.json.calledWith(resultFake)).to.be.equal(true);
  })
})

describe('Cria um produto' , () => {
  const response = {};
  const request = {};
  const next = () => {};
  const resultFake = {
      id: 2,
      name: 'Feijão',
      quantity: 30
    };

  before(() => {
    request.body = { ...resultFake };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, 'postProductService')
    .resolves(resultFake)
  })
  
  after(() => {
    productsService.postProductService.restore();
  })
  it('é retornado um status de 200', async () => {
    await productsController.postProductController(request, response, next)

    expect(response.status.calledWith(201)).to.be.equal(true);
  })
  it('é retornado um json com o produto criado', async () => {
    await productsController.postProductController(request, response, next)
    expect(response.json.calledWith(resultFake)).to.be.equal(true);
  })
})

describe('Atualiza um produto' , () => {
  const response = {};
  const request = {};
  const next = () => {};
  const resultFake = {
      id: 2,
      name: 'Feijão',
      quantity: 30
    };

  before(() => {
    request.body = { 
      name: 'Feijão',
      quantity: 30 
    };
    request.params = { id: 2 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, 'attProductService')
    .resolves(resultFake)
  })
  
  after(() => {
    productsService.attProductService.restore();
  })
  it('é retornado um status de 200', async () => {
    await productsController.attProductController(request, response, next)

    expect(response.status.calledWith(200)).to.be.equal(true);
  })
  it('é retornado um json com o produto atualizado', async () => {
    await productsController.attProductController(request, response, next)
    expect(response.json.calledWith(resultFake)).to.be.equal(true);
  })
})
