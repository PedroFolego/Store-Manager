const salesModel = require('../models/salesModel');

const getSalesService = async () => {
  const sales = await salesModel.getSalesModel();
  return sales;
};

const getSaleIDService = async (id) => {
  const sale = await salesModel.getSaleIDModel(id);
  return sale;
};

module.exports = {
  getSalesService,
  getSaleIDService,
};
