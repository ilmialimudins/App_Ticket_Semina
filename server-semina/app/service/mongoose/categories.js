const Categories = require('../../api/v1/categories/model');
const { BadRequestError, NotFoundError } = require('../../errors');

//Get
const getAllCategories = async () => {
  const result = await Categories.find();
  return result;
};

//Create new
const createCategories = async (req) => {
  const { name } = req.body;

  const check = await Categories.findOne({ name });
  if (check) throw new BadRequestError('kategori nama duplikat');
  const result = await Categories.create({ name });
  return result;
};

//Get one
const getOneCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id: ${id}`);
  return result;
};

module.exports = { getAllCategories, createCategories, getOneCategories };
