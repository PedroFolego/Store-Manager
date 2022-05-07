const productsModel = require('../models/productsModel');

const getProductsService = async () => {
  const products = await productsModel.getProductsModel();
  return products;
};

const getProdIDService = async (id) => {
  const [product] = await productsModel.getProdIDModel(id);
  return product;
};

module.exports = {
  getProductsService,
  getProdIDService,
};
