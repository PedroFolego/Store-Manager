const productsService = require('../services/productsService');
const {
  OK_STATUS,
  NOT_FOUND_STATUS,
  CREATED_STATUS,
  NO_CONTENT_STATUS,
  errorMessage,
} = require('../utils/constants');
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
  try {
    const { id } = req.params;
    const product = await productsService.getProdIDService(id);
  
    if (!product) return next(statusMessage(NOT_FOUND_STATUS, errorMessage.notFoundProd));
  
    return res.status(OK_STATUS).json(product);
  } catch (error) {
    next(error);
  }
};

const postProductController = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const {
      error, status, message, obj,
    } = await productsService.postProductService(name, quantity);
    if (error) return next(statusMessage(status, message));

    return res.status(CREATED_STATUS).json(obj);
  } catch (error) {
    next(error);
  }
};

const attProductController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productsService.getProdIDService(id);
    if (!product) return next(statusMessage(NOT_FOUND_STATUS, errorMessage.notFoundProd));
    
    const { name, quantity } = req.body;
    const {
      error, status, message, obj,
    } = await productsService.attProductService(id, name, quantity);
    if (error) return next(statusMessage(status, message));

    return res.status(OK_STATUS).json(obj);
  } catch (error) {
    next(error);
  }
};

const deleteProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProdIDService(id);
    if (!product) return next(statusMessage(NOT_FOUND_STATUS, errorMessage.notFoundProd));

    await productsService.deleteProductService(id);
    return res.status(NO_CONTENT_STATUS).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductsController,
  getProdIDController,
  postProductController,
  attProductController,
  deleteProductController,
};