const express = require('express');
const salesController = require('../../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getSalesController);
salesRouter.get('/:id', salesController.getSalesIDController);

module.exports = salesRouter;