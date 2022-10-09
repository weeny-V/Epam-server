const mongoose = require('mongoose');
const Joi = require('joi');

const UsersJoiSchema = Joi.object({
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/),

  username: Joi.string()
    .max(16)
    .min(3)
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  createdDate: {
    type: String,
    required: false,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
  UsersJoiSchema,
};
