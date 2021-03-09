const db = require("../models");
const Card = db.card;

exports.addcard = (req, res) => {
    console.log(req.body)
  return Card.create({
    card_no: req.body.card_no,
    expiry_date: req.body.expiry_date,
    card_name: req.body.card_name,
    userId: req.body.id,
  })
    .then((result) => {
    //   console.log(result);
      res.status(201).send({ message: "card added successfully!" });
    })
    .catch((err) => console.log(err));
};
