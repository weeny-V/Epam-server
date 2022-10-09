const { saveUser } = require('../services/authService');
const { User, UsersJoiSchema } = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({
        message: 'Specify all require parameters username, password',
      });
    }

    await saveUser({ username, password });

    return res.status(200).send({
      message: 'Profile created successfully',
      status: 200,
    });
  } catch (err) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
      return res.status(400).send({
        message: 'User with this username already exist'
      })
    }

    return next(err);
  }
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  UsersJoiSchema.validate({ username: req.body.username, password: req.body.password });
  if (user && await bcrypt.compare(String(req.body.password), String(user.password))) {
    const payload = {
      username: user.username,
      userId: user._id,
      createdDate: user.createdDate,
    };
    console.log(process.env.SECRET_KEY);
    const jwtToken = jwt.sign(payload, process.env.SECRET_KEY);

    return res.status(200).send({
      jwt_token: jwtToken,
      message: 'User successfully log in',
      status: 200,
    });
  }
  return res.status(403).json({ message: 'Not authorized' });
};

module.exports = {
  loginUser,
  registerUser,
}
