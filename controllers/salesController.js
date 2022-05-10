const salesService = require('../services/salesService');
const { OK_STATUS, NOT_FOUND_STATUS, CREATED_STATUS, errorMessage } = require('../utils/constants');
const { statusMessage } = require('../utils/functions');

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
  
    if (sale.length === 0) return next(statusMessage(NOT_FOUND_STATUS, errorMessage.notFoundSale));
  
    return res.status(OK_STATUS).json(sale);
  } catch (error) {
    next(error);
  }
};

const validateBodySale = (req, res, next) => {
  next();
  const { body } = req;
  const error = body.forEach(salesService.validateEachSell);

  if (error) {
    console.log('entrou', error);
    const { status, message } = error;
    return next(statusMessage(status, message));
  }
  next();
};

const postSaleController = async (req, res, next) => {
  try {
    const { body } = req;
    const { sale } = await salesService.postSaleService(body);

    return res.status(CREATED_STATUS).json(sale);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSalesController,
  getSalesIDController,
  validateBodySale,
  postSaleController,
};