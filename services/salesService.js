const salesModel = require('../models/salesModel');
const { schemaSales } = require('../schemas/sales');
const {
  returnValidation,
  checkError,
} = require('../utils/functions');

const getSalesService = async () => {
  const sales = await salesModel.getSalesModel();
  return sales;
};

const getSaleIDService = async (id) => {
  const sale = await salesModel.getSaleIDModel(id);
  return sale;
};

const postSaleService = async (productId, quantity) => {
  const { error } = schemaSales.validate({ productId, quantity });
  if (error) return returnValidation(checkError(error.message), error.message);

  const obj = {};
  return { error: false, obj };
};

module.exports = {
  getSalesService,
  getSaleIDService,
  postSaleService,
};
