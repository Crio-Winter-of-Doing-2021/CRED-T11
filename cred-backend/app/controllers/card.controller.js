const db = require("../models");
const { Op } = require("sequelize");
const Card = db.card;
const Transaction = db.transaction;
exports.addCard = (req, res) => {
  return Card.create({
    card_no: req.body.card_no,
    expiry_date: req.body.expiry_date,
    card_name: req.body.card_name,
    userId: req.userId,
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
  }).then((Card) => {
    res.status(201).send({ data: Card });
  });
};

exports.statementCard = (req, res) => {
  const { id, year, month } = req.params;
  Transaction.create({
    amount: req.body.amount,
    vendor: req.body.vendor,
    transaction_type: req.body.transaction_type,
    transaction_date: year + "-" + month,
    category: req.body.category,
    cardId: id,
  })
    .then((result) => {
      res.status(200).send({ message: "transaction added successfully" });
    })
    .catch((err) => console.log(err));
};

exports.viewStatements = (req, res) => {
  const { id, year, month } = req.params;
  Transaction.findAll({
    where: {
      cardId: id,
      transaction_date: year + "-" + month,
    },
  }).then((data) => {
    console.log(data);
    res.status(200).send({ data: data });
  });
  console.log(id);
};

exports.amountPay = (req, res) => {
  Card.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((card) => {
      Card.update(
        {
          amount_paid: req.body.amount + card.amount_paid,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
        .then((result) => {
          console.log("amount paid successfully");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
