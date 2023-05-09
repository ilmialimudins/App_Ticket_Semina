const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//Object with Validation
let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama User harus diisi'],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email harus diisi'],
    }, 
    password: {
      type: String,
      required: [true, 'password harus diisi'],
      minLength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'organizer', 'owner'],
      default: 'admin',
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organizer',
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', userSchema);
