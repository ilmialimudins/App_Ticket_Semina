//import service
const { signIn } = require('../../../service/mongoose/auth');

//import status code
const { StatusCodes } = require('http-status-codes');

const signInCMS = async (req, res, next) => {
  try {
    const result = await signIn(req);
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { signInCMS };
