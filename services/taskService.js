const { Task, TasksJoiSchema } = require('../models/Tasks');

const saveTask = async ({ name, status, boardID }) => {
  TasksJoiSchema.validate({ name, status, boardID });

  const task = new Task({ boardID, name, status, createdAt: new Date() });

  return await task.save();
};

module.exports = {
  saveTask,
};
