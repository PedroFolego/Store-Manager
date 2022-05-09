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

const findProduct = async (name) => {
  const products = await productsModel.getProductsModel();
  const productExist = products.some((pr) => pr.name === name);
  if (productExist) {
    return returnValidation(CONFLICT_STATUS, errorMessage.productExist);
  }
  return productExist;
};

const postProductService = async (name, quantity) => {
  const validate = validateProduct(name, quantity);
  if (validate) return validate;

  const obj = await productsModel.postProductModel(name, quantity);
  return { obj };
};

const attProductService = async (id, name, quantity) => {
  const validate = validateProduct(name, quantity);
  if (validate) return validate;

  const findProd = await findProduct(name);
  if (findProd) return findProd;

  const obj = await productsModel.attProductModel(id, name, quantity);
  return { obj };
};

const deleteProductService = async (id) => {
  await productsModel.deleteProductModel(id);
};

module.exports = {
  getProductsService,
  getProdIDService,
  postProductService,
  attProductService,
  deleteProductService,
};
