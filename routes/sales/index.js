const express = require('express');
const salesController = require('../../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getSalesController);
salesRouter.get('/:id', salesController.getSalesIDController);
salesRouter.post('/', salesController.postSaleController);

module.exports = salesRouter;