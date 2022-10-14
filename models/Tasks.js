const mongoose = require('mongoose');
const Joi = require('joi');

const TasksJoiSchema = Joi.object({
  boardID: Joi.string(),

  status: Joi.string(),

  name: Joi.string(),
});

const TaskSchema = new mongoose.Schema({
  boardID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['TODO', 'IN PROGRESS', 'DONE'],
  },
  isArchived: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  }
})

const Task = mongoose.model('Tasks', TaskSchema)

module.exports = {
  Task,
  TasksJoiSchema,
}

