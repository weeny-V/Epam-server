const express = require('express');
const boardController = require('../controllers/boardController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, boardController.getBoard);

router.get('/:boardID', authMiddleware, boardController.getBoardById);

router.post('/add', authMiddleware, boardController.createBoard);

router.put('/update/:boardID', authMiddleware, boardController.editBoard);

router.delete('/:boardID', authMiddleware, boardController.deleteBoard);

router.patch('/color/:boardID/:column', authMiddleware, boardController.changeColumnColor);

module.exports = {
  boardRouter: router,
}
