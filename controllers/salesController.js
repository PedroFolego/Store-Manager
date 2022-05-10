const salesService = require('../services/salesService');
const { 
  OK_STATUS, 
  NOT_FOUND_STATUS, 
  CREATED_STATUS, 
  NO_CONTENT_STATUS,
  errorMessage,
} = require('../utils/constants');
const { statusMessage } = require('../utils/functions');

// validation

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesService.getSaleIDService(id);
  
  if (sale.length === 0) return next(statusMessage(NOT_FOUND_STATUS, errorMessage.notFoundSale));
  next();
};

const getSalesController = async (_req, res, next) => {
  try {
    const sales = await salesService.getSalesService();
    return res.status(OK_STATUS).json(sales);
  } catch (error) {
    next(error);
  }
};

const getSalesIDController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getSaleIDService(id);
  
    return res.status(OK_STATUS).json(sale);
  } catch (error) {
    next(error);
  }
};

const validateBodySale = (req, res, next) => {
  const { body } = req;

  const response = salesService.validateEachSell(body); // body.forEach(salesService.validateEachSell);

  if (response) {
    console.log('entrou', response);
    const { status, message } = response;
    return next(statusMessage(status, message));
  }
  next();
};

const postSaleController = async (req, res, next) => {
  try {
    const { body } = req;
    const sale = await salesService.postSaleService(body);

    return res.status(CREATED_STATUS).json(sale);
  } catch (err) {
    next(err);
  }
};

const putSaleController = async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const sale = await salesService.putSaleService(id, body);

    return res.status(OK_STATUS).json(sale);
  } catch (err) {
    next(err);
  }
};

const deleteSaleController = async (req, res, next) => {
  try {
    console.log('entrou');

    const { id } = req.params;
    await salesService.deleteSaleService(id);

    return res.status(NO_CONTENT_STATUS).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSalesController,
  getSalesIDController,
  validateBodySale,
  postSaleController,
  validateId,
  putSaleController,
  deleteSaleController,
};