const db = require("../models");
const Card = db.card;
const luhnCheck = require("../utils/utils.js")


checkCardValidation = (req, res, next) => {
  const card_no = parseInt(req.body.card_no)
  if (luhnCheck(card_no)) {
    Card.findOne({
      where: {
        card_no: req.body.card_no,
      },
    }).then((card) => {
      if (card) {
        res.status(400).send({
          message: "Failed! Card is already exist!",
        });
        return;
      }

      next();
    });
  } else {
    res.status(400).send({
      message: "Invalid card number!"
    })
  }

};


const validateCard = {
  checkCardValidation: checkCardValidation,
};

module.exports = validateCard;
