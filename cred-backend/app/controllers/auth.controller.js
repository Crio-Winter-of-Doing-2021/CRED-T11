const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const { sendJSONResponse, sendBadRequest } = require("../utils/handle")
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    let user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
    if (user) {
      return sendJSONResponse(res, 200, 'User Registered Successfully')
    }
  }
  catch (err) {
    return sendBadRequest(res, 500, 'Could not sign up user');
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    })
    if (!user) {
      return sendBadRequest(res, 404, "User Not Found");
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return sendBadRequest(res, 401, "Invalid Password!");
    }
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    return sendJSONResponse(res, 200, "Signed In", {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      accessToken: token,
    })
  }
  catch (err) {
    return sendBadRequest(res, 500, `${err.message}`)
  }
};
