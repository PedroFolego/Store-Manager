const { BAD_REQUEST_STATUS, UNPROCESSABLE_ENTITY_STATUS } = require('./constants');

const statusMessage = (status, message) => ({ status, message });

const responseMessage = (message) => ({ message });

const checkError = (message) => {
  if (message.includes('is required')) return BAD_REQUEST_STATUS; 
  return UNPROCESSABLE_ENTITY_STATUS;
};

const returnValidation = (status, message) => ({ error: true, message, status });

module.exports = {
  statusMessage,
  responseMessage,
  checkError,
  returnValidation,
};
