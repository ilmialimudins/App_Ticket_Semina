//import handle error auth
const { UnauthorizedError, UnauthenticatedError } = require('../errors');
//import token jwt
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    //check header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthenticatedError('Authentication invalid');
    }

    //Attach the user and his permission to the req object
    req.user = {
      email: payload.email,
      role: payload.role,
      name: payload.name,
      organizer: payload.organizer,
      id: payload.userId,
    };
    next();
  } catch (err) {
    next(err);
  }
};

const authenticateParticipant = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }
    if (!token) {
      throw new UnauthenticatedError('Authentication Invalid');
    }

    const payload = isTokenValid({ token });
    req.participant = {
      email: payload.email,
      lastName: payload.lastName,
      firstName: payload.firstName,
      id: payload.participantId,
    };
    next();
  } catch (err) {
    next(err);
  }
};

const authorizeRoles = (...role) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to acces this route');
    }
    next();
  };
};

module.exports = { authenticateUser, authenticateParticipant, authorizeRoles };
