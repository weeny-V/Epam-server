const { Board, BoardsJoiSchema } = require('../models/Boards');

const saveBoard = async ({ createdBy, name, description }) => {
  BoardsJoiSchema.validate({ createdBy, name, description });

  const board = new Board({ createdBy, name, description, createdAt: new Date() });

  return await board.save();
};

module.exports = {
  saveBoard,
};
