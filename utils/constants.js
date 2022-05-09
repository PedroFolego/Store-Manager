const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NO_CONTENT_STATUS = 204;
const BAD_REQUEST_STATUS = 400;
const UNAUTHORIZED_STATUS = 401;
const CONFLICT_STATUS = 409;
const NOT_FOUND_STATUS = 404;
const UNPROCESSABLE_ENTITY_STATUS = 422;
const INTERNAL_SERVER_ERRROR_STATUS = 500;

const errorMessage = {
  serverError: 'Internal Server Error',
  notFoundProd: 'Product not found',
  notFoundSale: 'Sale not found',
  productExist: 'Product already exists',
};

module.exports = {
  errorMessage,
  OK_STATUS,
  CREATED_STATUS,
  NO_CONTENT_STATUS,
  UNAUTHORIZED_STATUS,
  CONFLICT_STATUS,
  NOT_FOUND_STATUS,
  UNPROCESSABLE_ENTITY_STATUS,
  BAD_REQUEST_STATUS,
  INTERNAL_SERVER_ERRROR_STATUS,
};