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

//Update
const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // cari categories dengan field name dan id selain dari yang dikirim dari params
  const check = await Categories.findOne({
    name,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError('kategori nama duplikat');

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id :${id}`);
  return result;
};

//Delete
const deleteCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findByIdAndRemove(id);

  if (!result) {
    throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);
  }

  return result;
};
module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
};
