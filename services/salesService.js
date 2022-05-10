const salesModel = require('../models/salesModel');
const { schemaSales } = require('../schemas/sales');
const {
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

const validateEachSell = (body) => {
  const getError = body.map(({ productId, quantity }) => {
    const { error } = schemaSales.validate({ productId, quantity });
    return error;
  }).find((err) => err);
  if (getError) return { status: checkError(getError.message), message: getError.message };
};

const postSaleService = async (arrSale) => {
  const sale = await salesModel.postSaleModel(arrSale);
  return sale;
};

const putSaleService = async (id, arrSale) => {
  const sale = await salesModel.putSaleModel(id, arrSale);
  return sale;
};

const deleteSaleService = async (id) => salesModel.deleteSaleModel(id);

module.exports = {
  getSalesService,
  getSaleIDService,
  validateEachSell,
  postSaleService,
  putSaleService,
  deleteSaleService,
};
