const Images = require('../../api/v1/images/model');

/**
 * 1. cara pertama
 * 2. guanain generate image
 */

//cara 1.
const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `images/${req.file.filename}`
      : 'uploads/avatar/default.jpeg',
  });
  return result;
};

// 2. guanain generate image
const generateUrlImages = async (req) => {
  const result = `uploads/${req.file.filename}`;
  return result;
};

module.exports = { createImages, generateUrlImages };
