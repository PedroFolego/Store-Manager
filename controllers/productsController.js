const productsService = require('../services/productsService');
const { OK_STATUS, NOT_FOUND_STATUS, errorMessage } = require('../utils/constants');
const { statusMessage } = require('../utils/functions');

const getProductsController = async (req, res, next) => {
  try {
    const products = await productsService.getProductsService();
    return res.status(OK_STATUS).json(products);
  } catch (error) {
    next(error);
  }
};

const getProdIDController = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsService.getProdIDService(id);

  if (!product) return next(statusMessage(NOT_FOUND_STATUS, errorMessage.notFound));

  return res.status(OK_STATUS).json(product);
};

module.exports = {
  getProductsController,
  getProdIDController,
};