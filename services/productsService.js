const productsModel = require('../models/productsModel');
const { schemaProducts } = require('../schemas/products');
const { CONFLICT_STATUS, errorMessage } = require('../utils/constants');
const {
  returnValidation,
  checkError,
} = require('../utils/functions');

const getProductsService = async () => {
  const products = await productsModel.getProductsModel();
  return products;
};

const getProdIDService = async (id) => {
  const [product] = await productsModel.getProdIDModel(id);
  return product;
};

const validateProduct = (name, quantity) => {
  const { error } = schemaProducts.validate({ name, quantity });
  if (error) return returnValidation(checkError(error.message), error.message);
  return false;
};

const postProductService = async (name, quantity) => {
  const validate = validateProduct(name, quantity);
  if (validate) return validate;

  const products = await productsModel.getProductsModel();
  if (products.find((pr) => pr.name === name)) {
    return returnValidation(CONFLICT_STATUS, errorMessage.productExist);
  }
  const obj = await productsModel.postProductModel(name, quantity);
  return { obj };
};

module.exports = {
  getProductsService,
  getProdIDService,
  postProductService,
};
