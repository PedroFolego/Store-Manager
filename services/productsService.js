const productsModel = require('../models/productsModel');

const getProductsService = async () => {
  const products = await productsModel.getProductsModel();
  return products;
};

const getProdIDService = async (id) => {
  const [product] = await productsModel.getProdIDModel(id);
  console.log(product);
  return product;
};

module.exports = {
  getProductsService,
  getProdIDService,
};
