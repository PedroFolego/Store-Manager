const express = require('express');
const salesController = require('../../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getSalesController);

salesRouter.get('/:id', 
  salesController.validateId,
  salesController.getSalesIDController);
  
salesRouter.post('/',
  salesController.validateBodySale,
  salesController.postSaleController);

salesRouter.put('/:id',
  salesController.validateBodySale,
  salesController.putSaleController);

salesRouter.delete('/:id', 
  salesController.validateId,
  salesController.deleteSaleController);

module.exports = salesRouter;