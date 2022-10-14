const { Task } = require('../models/Tasks');
const { saveTask } = require('../services/taskService');
const { Comment } = require('../models/Comment');

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

const editTask = async (req, res, next) => {
  const { taskID } = req.params;
  const { name } = req.body;

  try {
    const editTask = await Task.findOneAndUpdate({ _id: taskID }, {
      $set: { name },
    });

    if (!editTask) {
      return res.status(400).send({
        message: 'We cannot find task with such an ID',
        status: 400,
      });
    }

    return res.status(200).send({
      message: 'Task successfully edited',
      status: 200,
    })
  } catch (err) {
    return next(err);
  }
};

const deleteTask = async (req, res, next) => {
  const { taskID } = req.params;

  try {
    const deletedTask = await Task.deleteOne({ _id: taskID });

    if (!deletedTask) {
      return res.status(400).send({
        message: 'We cannot delete task with such an ID',
        status: 400,
      });
    }

    await Comment.deleteMany({ taskID: taskID });

    return res.status(200).send({
      message: 'Tas successfully deleted',
      status: 200,
    })
  } catch (err) {
    return next(err);
  }
};

const updateArchiveStatus = async (req, res, next) => {
  const { taskID } = req.params;
  const { archive } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate({ _id: taskID}, {
      $set: { isArchived: !archive }
    });

    if (!updatedTask) {
      return res.status(400).send({
        message: 'We cannot find task with such an ID',
        status: 400
      });
    }

    return res.status(200).send({
      message: 'Successfully changed',
      status: 200,
    })
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllMyTasks,
  createTask,
  changeStatusByID,
  editTask,
  deleteTask,
  updateArchiveStatus,
};
