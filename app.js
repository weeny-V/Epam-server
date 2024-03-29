const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const db = require('./database');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const { authRouter } = require('./routers/authRouter');
const { boardRouter } = require('./routers/boardRouter');
const { taskRouter } = require('./routers/taskRouter');
const { commentRouter } = require('./routers/commentRouter');
const { userRouter } = require('./routers/userRouter');

app.use('/api/auth', authRouter);
app.use('/api/board', boardRouter);
app.use('/api/task', taskRouter);
app.use('/api/comment', commentRouter);
app.use('/api/user', userRouter);


db.connect();

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`> Example app listening on port ${port}`)
    });
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};

start();

function errorHandler(err, req, res) {
  res.status(500).send({ message: err, status: 500 });
}

app.use(errorHandler);
