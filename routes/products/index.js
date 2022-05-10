const express = require('express');
const productsController = require('../../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProductsController);

productsRouter.get('/:id',
  productsController.validateProductID,
  productsController.getProdIDController);

productsRouter.post('/', 
  productsController.validateSchema,
  productsController.validateNameProdExist,
  productsController.postProductController);

productsRouter.put('/:id', 
  productsController.validateProductID,
  productsController.validateNameProdExist,
  productsController.attProductController);

productsRouter.delete('/:id', 
  productsController.validateProductID,
  productsController.deleteProductController);

module.exports = productsRouter;