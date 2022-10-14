const { saveComment } = require('../services/commentService');
const { Comment } = require('../models/Comment');

const getComments = async (req, res, next) => {
  const { taskID } = req.params;

  try {
    const comments = await Comment.find({ taskID })

    return res.status(200).send({
      comments,
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
};

const addComment = async (req, res, next) => {
  const { boardID, taskID, from, message, photo } = req.body;

  if (!boardID || !taskID || !from || !message) {
    return res.status(400).send({
      message: 'Please specify all require parameters',
      status: 400,
    });
  }
  try {
    const comment = await saveComment({ boardID, taskID, from, message, photo });

    return res.status(200).send({
      message: 'Comment successfully created',
      status: 200,
      comment,
    })
  } catch (err) {
    return next(err);
  }
};

const deleteComment = async (req, res, next) => {
  const { commentID } = req.params;

  try {
   const deletedComment = await Comment.deleteOne({ _id: commentID });

   if (!deletedComment) {
     return res.status(400).send({
       message: 'We cannot delete comment with such an ID',
       status: 400,
     });
   }

   return res.status(200).send({
     message: 'We successfully deleted comment',
     status: 200,
   })
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment
}
