const db = require("../models");
const Card = db.card;

checkCardValidation = (req, res, next) => {
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
};

const validateCard = {
  checkCardValidation: checkCardValidation,
};

module.exports = validateCard;
