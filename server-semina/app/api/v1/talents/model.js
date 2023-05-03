const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let talentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama harus diisi'],
    },
    role: {
      type: String,
      default: '-',
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = model('Talent', talentSchema);
