const mongoose = require('mongoose');
const Joi = require('joi');

const CommentsJoiSchema = Joi.object({
  boardID: Joi.string(),

  taskID: Joi.string(),

  from: Joi.string(),

  message: Joi.string(),
});

const CommentSchema = new mongoose.Schema({
  boardID: {
    type: String,
    required: true,
  },
  taskID: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  photo: {
    type: Buffer || null,
    required: false,
  },
  createdAt: {
    type: String,
    required: true,
  }
})

const Comment = mongoose.model('Comments', CommentSchema)

module.exports = {
  Comment,
  CommentsJoiSchema,
}

