const db = require("../models");
const Card = db.card;

exports.addcard = (req, res) => {
  return Card.create({
    card_no: req.body.card_no,
    expiry_date: req.body.expiry_date,
    card_name: req.body.card_name,
    id: req.body.id,
  })
    .then((result) => {
      console.log("card added successfully");
    })
    .catch((err) => console.log(err));
};
