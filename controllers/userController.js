const { User } = require('../models/Users');

const getUserInfo = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await User.findOne({ _id: req.user.userId });

    if (!user) {
      return res.status(400).send({
        message: 'We could not find user with this ID',
        status: 400,
      });
    }

    return res.status(200).send({
      user,
      status: 200,
    })
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getUserInfo,
}
