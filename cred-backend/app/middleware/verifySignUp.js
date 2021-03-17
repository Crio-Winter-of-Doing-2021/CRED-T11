const db = require("../models");
const User = db.user;
const {sendJSONResponse,sendBadRequest} = require("../utils/handle")
checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  try{
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    })
    if(user){
      return sendBadRequest(res,400,"Failed! Username is already in use!")
    }
    const email = await User.findOne({
      where: {
        email: req.body.email,
      },
    })
    if(email){
      return sendBadRequest(res,400,"Failed! Email is already in use!")
    }
    next();
  }
  catch (error) {
    console.log(error);
    return sendBadRequest(res, 400, `Could not verify user: ${error}`);
}
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
