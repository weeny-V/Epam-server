const express = require('express');
const commentController = require('../controllers/commentController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:taskID', authMiddleware, commentController.getComments);

router.post('/', authMiddleware, commentController.addComment);

router.delete('/:commentID', authMiddleware, commentController.deleteComment);

module.exports = {
  commentRouter: router
}
