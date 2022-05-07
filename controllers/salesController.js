const salesService = require('../services/salesService');
const { OK_STATUS, NOT_FOUND_STATUS, errorMessage } = require('../utils/constants');
const { statusMessage } = require('../utils/functions');

const getSalesController = async (req, res, next) => {
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
  
    if (!sale) return next(statusMessage(NOT_FOUND_STATUS, errorMessage.notFoundSale));
  
    return res.status(OK_STATUS).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSalesController,
  getSalesIDController,
};