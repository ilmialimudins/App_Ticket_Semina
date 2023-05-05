//import model events
const Events = require('../../api/v1/events/model');
const { checkingCategories } = require('./categories');
const { checkingImage } = require('./images');
const { checkingTalents } = require('./talents');

const { BadRequestError, NotFoundError } = require('../../errors');
const { CONFLICT } = require('http-status-codes');

// get All event
const getAllEvents = async (req) => {
  const { keyword, category, talent } = req.query;
  let condition = {};

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  if (talent) {
    condition = { ...condition, talent: talent };
  }

  const result = await Events.find(condition)
    .populate({ path: 'image', select: '_id name' })
    .populate({
      path: 'category',
      select: '_id name',
    })
    .populate({
      path: 'talen',
      select: '_id name role image',
      populate: { path: 'imgae', select: '_id name' },
    });
  return result;
};

//create events
const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  //cari image, category , dan talent dengan id
  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  //cari events dengan field name
  const check = await Events.findOne({ title });

  //apabila cek true / data events sudah ada maka kita tampilkan error bad request
  if (check) throw new BadRequestError('judul event duplikat');

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  });
  return result;
};

//get one events

const getOneEvents = async (req) => {
  const { id } = req.params;
  const result = await Events.findOne({ _id: id })
    .populate({ path: 'image', select: '_id name' })
    .populate({ path: 'category', select: '_id name' })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: { path: 'image', select: '_id name' },
    });

  if (!result) {
    throw new BadRequestError(`Tidak ada pembicara dengan id: ${id}`);
  }
  return result;
};

//update events
const updateEvents = async (req) => {
  const { id } = req.params;

  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  // cari image, category dan talent dengan field id
  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  //cari events dengan field name dan id selain dari yang dikirim dari params
  const check = await Events.findOne({
    title,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError('judul event duplicate');

  const result = await Events.findOneAndUpdated(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
    },
    { new: true, runValidators: true }
  );

  if (!result) throw new BadRequestError(`Tidak ada acara dengan id: ${id}`);
  return result;
};

//delete event
const deleteEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findByIdAndRemove(id);

  if (!result) {
    throw new BadRequestError(`Tidak ada pembicara dengan id: ${id}`);
  }

  return result;
};

module.export = {
  getAllEvents,
  getOneEvents,
  createEvents,
  updateEvents,
  deleteEvents,
};
