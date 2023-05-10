const Users = require('../../../app/api/v1/users/model');
const { BadRequestError, UnauthorizedError } = require('../../errors');
const {
  createJWT,
  createTokenUser,
  //  createRefreshJWT
} = require('../../utils');

// const {createUserRefreshToken}=require('./refresToken')

const signIn = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const result = await Users.findOne({ email: email });

  if (!result) {
    const error = new UnauthorizedError({
      msg: 403,
      error: 'Invalid Credentials',
    });
    throw error;
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const token = createJWT({ payload: createTokenUser(result) });

  // const refreshToken = createRefreshJWT({ payload: createTokenUser(result) });
  // await createRefreshJWT({ refreshToken, user: result._id });

  return {
    token,
    // refreshToken,
    role: result.role,
    email: result.email,
  };
};

module.exports = { signIn };
