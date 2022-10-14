const { saveBoard } = require('../services/boardService');
const { Board } = require('../models/Boards');
const { Task } = require('../models/Tasks');
const { Comment } = require('../models/Comment');

const getBoard = async (req, res) => {
  const boards = await Board.find({
    createdBy: req.user.userId,
  })

  return res.status(200).send({
    status: 200,
    boards,
  })
}

const createBoard = async (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).send({
      message: 'Please specify all required parameters',
      status: 400,
    })
  }

  try {
    const board = await saveBoard({ createdBy: req.user.userId, name, description });

    return res.status(200).send({
      message: 'Board successfully created',
      status: 200,
      board,
    })
  } catch (err) {
    return next(err);
  }
};

const editBoard = async (req, res) => {
  const { boardID } = req.params;
  const { name } = req.body;

  if (boardID === 'undefined' || !name) {
    return res.status(400).send({
      message: 'Please specify all required parameters',
      status: 400,
    })
  }

  const board = await Board.findOne({
    _id: boardID
  })

  if (!board) {
    return res.status(400).send({
      message: 'We didn\'t find board with this ID',
      status: 400,
    })
  }

  await board.updateOne({
    $set: { name }
  })

  return res.status(200).send({
    message: 'Board name successfully update',
    status: 200,
  })
};

const deleteBoard = async (req, res) => {
  try {
    const { boardID } = req.params;
    const deletedBoard = await Board.deleteOne({
      _id: boardID,
    });
    await Task.deleteMany({ boardID });
    await Comment.deleteMany({ boardID });

    if (!deletedBoard) {
      return res.status(400).send({
        message: 'We cannot find this board',
        status: 400,
      })
    }

    return res.status(200).send({
      message: 'Board was successfully deleted',
      status: 200,
    })
  } catch (err) {
    return res.status(400).send({
      message: 'We cannot find board with such an ID',
      status: 400,
    })
  }
};

const getBoardById = async (req, res) => {
  const { boardID } = req.params;

  try {
    const board = await Board.findOne({ _id: boardID });

    if (!board) {
      return res.status(400).send({
        message: 'We cannot find board with this ID',
        status: 400,
      })
    }

    return res.status(200).send({
      message: 'Successfully',
      status: 200,
      board,
    })
  } catch (err) {

  }
}

const changeColumnColor = async (req, res, next) => {
  const { boardID, column } = req.params;
  const { color } = req.body;

  try {
    const board = await Board.updateOne({ _id: boardID}, {
      $set: { [`${column}`]: color }
    })

    if (!board) {
      return res.status(400).send({
        message: 'We cannot change color of this column',
        status: 400,
      });
    }

    return res.status(200).send({
      message: 'Color of this board successfully changed',
      status: 200,
    })
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getBoard,
  createBoard,
  editBoard,
  deleteBoard,
  getBoardById,
  changeColumnColor,
}
