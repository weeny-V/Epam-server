const mongoose = require('mongoose');
const Joi = require('joi');

const BoardsJoiSchema = Joi.object({
  createdBy: Joi.string(),

  name: Joi.string(),

  description: Joi.string(),
});

const BoardSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: String,
    required: true,
  },
  todoColor: {
    type: String,
    required: true,
  },
  progressColor: {
    type: String,
    required: true,
  },
  doneColor: {
    type: String,
    required: true,
  }
})

const Board = mongoose.model('Board', BoardSchema)

module.exports = {
  Board,
  BoardsJoiSchema,
}
