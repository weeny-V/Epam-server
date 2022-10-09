const bcryptjs = require('bcryptjs');
const { User, UsersJoiSchema } = require('../models/Users');

const saveUser = async ({ username, password }) => {
  UsersJoiSchema.validate({ username });

  const user = new User({
    username,
    password: await bcryptjs.hash(password, 10),
    createdDate: new Date(),
  });

  return await user.save();
};

module.exports = {
  saveUser,
};
