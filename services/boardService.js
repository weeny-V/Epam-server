const { Board, BoardsJoiSchema } = require('../models/Boards');

const saveBoard = async ({ createdBy, name, description }) => {
  BoardsJoiSchema.validate({ createdBy, name, description });

  const board = new Board({
    createdBy,
    name,
    description,
    todoColor: '#1f2937',
    progressColor: '#1f2937',
    doneColor: '#1f2937',
    createdAt: new Date() });

  return await board.save();
};

module.exports = {
  saveBoard,
};
