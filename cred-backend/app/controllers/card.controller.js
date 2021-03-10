const db = require("../models");
const Card = db.card;

exports.addCard = (req, res) => {
  console.log(req.body);
  return Card.create({
    card_no: req.body.card_no,
    expiry_date: req.body.expiry_date,
    card_name: req.body.card_name,
    userId: req.body.id,
  })
    .then((result) => {
      res.status(201).send({ message: "card added successfully!" });
    })
    .catch((err) => console.log(err));
};

exports.viewCard = (req, res) => {
  console.log(req.userId);
  Card.findAll({
    where: {
      userId: req.userId,
    },
  })
    .then((Card) => {
      res.status(201).send({data: Card})
    })
};
