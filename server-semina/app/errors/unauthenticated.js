const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api-error');

class Unauthentication extends CustomAPIError {
  constructor(message) {
    super(message);
    this.message = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthentication;
