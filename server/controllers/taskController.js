const { Task } = require('../models/Tasks');
const { saveTask } = require('../services/taskService');

const getAllMyTasks = async (req, res, next) => {
  const { boardID } = req.params;

  if (!boardID) {
    return res.status(400).send({
      message: 'Please specify all require parameters',
      status: 400,
    })
  }

  try {
    const tasks = await Task.find({ boardID });

    return res.status(200).send({
      message: 'Successfully',
      status: 200,
      tasks,
    })
  } catch (err) {
    return next(err)
  }
};

const createTask = async (req, res, next) => {
  const { boardID, status, name } = req.body;

  if (!boardID || !status || !name) {
    return res.status(400).send({
      message: 'Please specify all require parameters',
      status: 400,
    });
  }

  try {
    const newTask = await saveTask({ name, status, boardID });

    return res.status(200).send({
      message: 'Task successfully created',
      status: 200,
      newTask,
    })
  } catch (err) {
    return next(err);
  }
};

const changeStatusByID = async (req, res, next) => {
  const { taskID } = req.params;
  const { status } = req.body;

  if (!taskID || !status) {
    return res.status(400).send({
      message: 'Please specify all require parameters',
      status: 400,
    });
  }

  try {
    const changedTask = await Task.findOneAndUpdate({ _id: taskID }, {
      status,
    }, {
      new: true
    });

    if (!changedTask) {
      return res.status(400).send({
        message: 'Wrong task\'s ID',
        status: 400,
      });
    }

    return res.status(200).send({
      message: 'Status successfully changed',
      status: 200,
      changedTask,
    })
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAllMyTasks,
  createTask,
  changeStatusByID,
};
