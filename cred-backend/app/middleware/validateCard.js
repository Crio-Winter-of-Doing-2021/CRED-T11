const db = require("../models");
const Card = db.card;
const User = db.user;
const luhnCheck = require("../utils/utils.js");
const { sendBadRequest, sendJSONResponse } = require("../utils/handle");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);

checkCardValidation = async (req, res, next) => {
  try {
    const card_no = parseInt(req.body.card_no)
    if (luhnCheck(card_no)) {
      const card = await Card.findOne({
        where: {
          card_no: req.body.card_no,
        },

      })
      if (card) {
        const user = await User.findOne({
          where: {
            id: card.dataValues.userId
          },
        })
        twilioClient.verify
          .services("VAf7685d17a069ae7d1f5fe43ca9b7ec16")
          //Put the Verification service SID here
          .verifications.create({ to: user.email, channel: "email" })
          .then(verification => {
            console.log(verification.sid);
          });
        return sendBadRequest(res, 200, "Failed! Card already exist!");
      }
    } else {
      return sendBadRequest(res, 400, "Invalid card number!");
    }
    next();
  } catch (err) {
    return sendBadRequest(res, 500, `${err.message}`)
  }

};

checkFamilyAddValidation = async (req, res, next) => {
  req.cardId=req.body.cardId;
    twilioClient.verify
  .services("VAf7685d17a069ae7d1f5fe43ca9b7ec16") //Put the Verification service SID here
  .verificationChecks.create({ to: req.body.email, code: req.body.code })
  .then(verification_check => {
    if(verification_check.status === 'pending'){
      return sendBadRequest(res,400,'write correct code')
    }
    else if(verification_check.status === 'approved'){
      next();
    }
  }
    );

};

checkCardById = async (req, res, next) => {
  try {
    const card = await Card.findOne({
      where: {
        id: req.params.id
      }
    })
    if (!card) {
      return sendBadRequest(res, 400, "card doesn't exist");
    }
    next();
  } catch (err) {
    return sendBadRequest(res, 500, `${err.message}`)
  }

}
checkCardByUserId = async (req, res, next) => {
  try {
    const card = await Card.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    })
    if (!card) {
      return sendBadRequest(res, 401, "You are not authorized to view card");
    }
    next();
  } catch (err) {
    return sendBadRequest(res, 500, `${err.message}`)
  }

};

const validateCard = {
  checkCardValidation: checkCardValidation,
  checkCardById: checkCardById,
  checkCardByUserId: checkCardByUserId,
  checkFamilyAddValidation: checkFamilyAddValidation
};

module.exports = validateCard;
