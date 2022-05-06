const statusMessage = (status, message) => ({ status, message });

const responseMessage = (message) => ({ message });

module.exports = {
  statusMessage,
  responseMessage,
};
