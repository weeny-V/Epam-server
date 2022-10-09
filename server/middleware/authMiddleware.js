const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const {
    authorization,
  } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Please, provide authorization header', status: 401 });
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Please, include token to request', status: 401 });
  }

  try {
    console.log(process.env.SECRET_KEY)
    const tokenPayload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = {
      userId: tokenPayload.userId,
      username: tokenPayload.username,
      createdDate: tokenPayload.createdDate,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message, status: 401 });
  }
};

module.exports = {
  authMiddleware,
};
