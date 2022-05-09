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

const postSaleController = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const {
      error, status, message, obj,
    } = await salesService.postSaleService(productId, quantity);
    if (error) return next(statusMessage(status, message));

    return res.status(CREATED_STATUS).json(obj);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSalesController,
  getSalesIDController,
  postSaleController,
};