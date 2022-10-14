const { Comment, CommentsJoiSchema } = require('../models/Comment');

const saveComment = async ({ boardID, taskID, from, message, photo }) => {
  CommentsJoiSchema.validate({ boardID, taskID, from, message });

  const comment = new Comment({ boardID, taskID, from, message, photo, createdAt: new Date() });

  return await comment.save();
};

module.exports = {
  saveComment,
};
