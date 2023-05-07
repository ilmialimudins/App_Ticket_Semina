//import model events
const Events = require('../../api/v1/events/model');
const { checkingCategories } = require('./categories');
const { checkingImage } = require('./images');
const { checkingTalents } = require('./talents');

const { BadRequestError, NotFoundError } = require('../../errors');

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
      path: 'talent',
      select: '_id name role image',
      populate: { path: 'image', select: '_id name' },
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
  if (check) throw new BadRequestError('judul acara sudah terdaftar');

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
  if (!result) throw new NotFoundError(`Tidak ada events	 dengan id :${id}`);
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

  //carri  event berdasarkan  field id
  const checkEvent = await Events.findOne({
    _id: id,
  });

  //jika id false/ null maka akan menampilkan error ' Tidak ada acara dengan id:..
  if (!checkEvent) throw new NotFoundError(`Tidak ada acara dengan id: ${id}`);

  //cari events dengan field name dan id selain dari yang dikirim dari params
  const check = await Events.findOne({
    title,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError('judul acara telah terdaftar');

  const result = await Events.findByIdAndUpdate(
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

  return result;
};

//delete event
const deleteEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findByIdAndRemove(id);

  if (!result) {
    throw new BadRequestError(`Tidak ada acara dengan id: ${id}`);
  }

  return result;
};

//checking Events
const checkingEvents = async (id) => {
  const result = await Events.findOne({ _id: id });
  if (!result) throw new NotFoundError(`Tidak ada Event dengan id: ${id}`);
  return result;
};
module.exports = {
  getAllEvents,
  getOneEvents,
  createEvents,
  updateEvents,
  deleteEvents,
  checkingEvents,
};
