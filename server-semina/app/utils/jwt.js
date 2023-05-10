const jwt = require('jsonwebtoken');
const {
  jwtSecret,
  jwtExpiration,
  jwtRefreshTokenSecret,
  jwtRefreshTokenExpiration,
} = require('../config');

const  createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });
  return token;
};

// const createRefreshJwt = ({ payload }) => {
//   const token = jwt.sign(payload, jwtSecret, {
//     expiresIn: jwtRefreshTokenExpiration,
//   });
//   return token;
// };

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

// const isTokenValidRefreshToken = ({ token }) => jwt.verify(token, jwtSecret);

module.exports = {
  createJWT,
  isTokenValid,
  // createRefreshJwt
  // isTokenValidRefreshToken,
};
