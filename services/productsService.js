const productsModel = require('../models/productsModel');
const { schemaProducts } = require('../schemas/products');
const { CONFLICT_STATUS, errorMessage } = require('../utils/constants');
const {
  checkError,
} = require('../utils/functions');

// validate
const validateProductSchema = (name, quantity) => {
  const { error } = schemaProducts.validate({ name, quantity });
  if (error) {
    return { 
      status: checkError(error.message),
      message: error.message,
    };
  }
};

const findProduct = async (name) => {
  const products = await productsModel.getProductsModel();
  const productExist = products.some((pr) => pr.name === name);
  if (productExist) {
    return {
      status: CONFLICT_STATUS,
      message: errorMessage.productExist,
    };
  }
};

// conect to model
const getProductsService = async () => {
  const products = await productsModel.getProductsModel();
  return products;
};

const getProdIDService = async (id) => {
  const [product] = await productsModel.getProdIDModel(id);
  return product;
};

const postProductService = async (name, quantity) => {
  const product = await productsModel.postProductModel(name, quantity);
  return product;
};

const attProductService = async (id, name, quantity) => {
  const product = await productsModel.attProductModel(id, name, quantity);
  return product;
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
  validateProductSchema,
  findProduct,
};
