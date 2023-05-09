const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../errors');

/**
 * 1. cara pertama
 * 2. guanain generate image
 */

//cara 1.
const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : 'uploads/avatar/default.jpeg',
  });
  return result;
};

// 2. guanain generate image
const generateUrlImages = async (req) => {
  const result = `uploads/${req.file.filename}`;
  return result;
};

const checkingImage = async (id) => {
  const result = await Images.findById(id);

  if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id: ${id}`);

  return result;
};

module.exports = { createImages, generateUrlImages, checkingImage };
