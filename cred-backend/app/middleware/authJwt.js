const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const {sendBadRequest} = require("../utils/handle");

verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return sendBadRequest(res,403,"No token Provided")
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return sendBadRequest(res,401,"Unauthorized!");
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
