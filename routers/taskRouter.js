const express = require('express');
const taskController = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:boardID', authMiddleware, taskController.getAllMyTasks);

router.post('/create', authMiddleware, taskController.createTask);

router.patch('/:taskID', authMiddleware, taskController.changeStatusByID);

router.patch('/edit/:taskID', authMiddleware, taskController.editTask);

router.patch('/archive/:taskID', authMiddleware, taskController.updateArchiveStatus);

router.delete('/delete/:taskID', authMiddleware, taskController.deleteTask);

module.exports = {
  taskRouter: router
}
