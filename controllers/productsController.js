const productsService = require('../services/productsService');
const {
  OK_STATUS,
  NOT_FOUND_STATUS,
  CREATED_STATUS,
  NO_CONTENT_STATUS,
  errorMessage,
} = require('../utils/constants');
const { statusMessage } = require('../utils/functions');

// validate
const validateProductID = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsService.getProdIDService(id);

  if (!product) return next(statusMessage(NOT_FOUND_STATUS, errorMessage.notFoundProd));
  next();
};

const validateSchema = (req, res, next) => {
  const { name, quantity } = req.body;
  const response = productsService.validateProductSchema(name, quantity);
  if (response) return next(statusMessage(response.status, response.message));
  console.log('entrou 1');
  next();
};

const validateNameProdExist = async (req, res, next) => {
  const { name } = req.body;
  const response = await productsService.findProduct(name);
  if (response) return next(statusMessage(response.status, response.message));
  next();
};

//
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
    return res.status(OK_STATUS).json(product);
  } catch (error) {
    next(error);
  }
};

const postProductController = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const product = await productsService.postProductService(name, quantity);
    console.log('entrou 2');
    return res.status(CREATED_STATUS).json(product);
  } catch (error) {
    next(error);
  }
};

const attProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await productsService.attProductService(id, name, quantity);

    return res.status(OK_STATUS).json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProductController = async (req, res, next) => {
  try {
    const { id } = req.params;

    await productsService.deleteProductService(id);
    return res.status(NO_CONTENT_STATUS).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateProductID,
  getProductsController,
  getProdIDController,
  postProductController,
  attProductController,
  deleteProductController,
  validateSchema,
  validateNameProdExist,
};