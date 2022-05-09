const express = require('express');
const productsController = require('../../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProductsController);
productsRouter.get('/:id', productsController.getProdIDController);
productsRouter.post('/', productsController.postProductController);

module.exports = productsRouter;