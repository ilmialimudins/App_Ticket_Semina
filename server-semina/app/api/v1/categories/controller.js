const Categories = require('./model');
const {
  getAllCategories,
  createCategories,
  getOneCategories,
} = require('../../../service/mongoose/categories');

const create = async (req, res, next) => {
  try {
    const result = await createCategories(req);
    res.status(201).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllCategories();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneCategories(req);
    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    // const { id } = req.params;
    // const { name } = req.body;
    // const result = await Categories.findOne({ _id: id });

    // if (!result) {
    //   return res.status(404).json({ message: 'Id Categories tidak ditemukan' });
    // }
    // result.name = name;
    // result.save();
    // res.status(200).json({
    //   data: result,
    // });

    const { id } = req.params;
    const { name } = req.body;
    const result = await Categories.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Categories.findByIdAndRemove(id);
    res.status(200).json({
      data: result.name,
      message: `${result.name} telah behasil diapus`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, index, find, update, destroy };