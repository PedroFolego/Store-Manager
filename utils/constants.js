const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NO_CONTENT_STATUS = 204;
const BAD_REQUEST_STATUS = 400;
const UNAUTHORIZED_STATUS = 401;
const NOT_FOUND_STATUS = 404;
const INTERNAL_SERVER_ERRROR_STATUS = 500;

const errorMessage = {
  serverError: 'Internal Server Error',
  notFoundProd: 'Product not found',
  notFoundSale: 'Sale not found',
};

module.exports = {
  errorMessage,
  OK_STATUS,
  CREATED_STATUS,
  NO_CONTENT_STATUS,
  NOT_FOUND_STATUS,
  BAD_REQUEST_STATUS,
  UNAUTHORIZED_STATUS,
  INTERNAL_SERVER_ERRROR_STATUS,
};