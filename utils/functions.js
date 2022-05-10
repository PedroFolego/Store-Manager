const { BAD_REQUEST_STATUS, UNPROCESSABLE_ENTITY_STATUS } = require('./constants');

const statusMessage = (status, message) => ({ status, message });

const responseMessage = (message) => ({ message });

const checkError = (message) => {
  if (message.includes('is required')) return BAD_REQUEST_STATUS; 
  return UNPROCESSABLE_ENTITY_STATUS;
};

module.exports = {
  statusMessage,
  responseMessage,
  checkError,
};
