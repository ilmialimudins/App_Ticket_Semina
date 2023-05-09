const Users = require('../../api/v1/users/model');
const Organizer = require('../../../app/api/v1/organizers/model');
const { BadRequestError } = require('../../errors');

//Create Organizer
const createOrganizer = async (req) => {
  const { organizer, role, email, password, confirmPassword, name } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Pasword dan konfirmasi password tidak cocok');
  }

  const result = await Organizer.create({ organizer });

  const users = await Users.create({
    email,
    name,
    password,
    organizer: result.id,
    role,
  });

  delete users._doc.password;

  return users;
};

//Create User
const createUsers = async (req, res) => {
  const { name, password, role, confirmPasword, email } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan konfirmasi password tidak cocok');
  }

  const result = await Users.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });
  return result;
};

//Get All User
const getAllUsers = async (req) => {
  const result = await Users.find();
  return result;
};

module.exports = { createOrganizer, createUsers, getAllUsers };
