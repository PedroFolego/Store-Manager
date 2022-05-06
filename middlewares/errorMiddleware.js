const {
  INTERNAL_SERVER_ERRROR_STATUS,
  errorMessage,
} = require('../utils/constants');

const {
  responseMessage,
} = require('../utils/functions');

const errorMiddleware = (err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json(responseMessage(err.message));
  return res
    .status(INTERNAL_SERVER_ERRROR_STATUS)
    .json(responseMessage(errorMessage.serverError));
};

module.exports = {
  errorMiddleware,
};