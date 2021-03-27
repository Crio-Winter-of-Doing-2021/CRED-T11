const db = require("../models");
const Card = db.card;
const Transaction = db.transaction;
const Amountpaid = db.amountpaid;
const { sendJSONResponse, sendBadRequest } = require("../utils/handle");
exports.addCard = async (req, res) => {
  try {
    const card = await Card.create({
      card_no: req.body.card_no,
      expiry_date: req.body.expiry_date,
      card_name: req.body.card_name,
      userId: req.userId,
    })
    // console.log(card)
    await Amountpaid.create({
      cardId: card.dataValues.id,
      amount_paid:0
    })
    return sendJSONResponse(res, 201, "card added successfully!");
  } catch (err) {
    return sendBadRequest(res, 500, `${err.message}`);
  }
};

exports.viewCard = async (req, res) => {
  try {
    const card = await Card.findAll({
      where: {
        userId: req.userId,
      },
    })
    return sendJSONResponse(res, 201, "All cards of user", card)

  } catch (err) {
    return sendBadRequest(res, 500, `${err.message}`);
  }
};

exports.statementCard = async (req, res) => {
  try {
    const { id, year, month } = req.params;
    await Transaction.create({
      amount: req.body.amount,
      vendor: req.body.vendor,
      transaction_type: req.body.transaction_type,
      transaction_date: year + "-" + month,
      category: req.body.category,
      cardId: id,
    })
    const amountpaid = await Amountpaid.findOne({
      where: {
        cardId: id,
        date: year + "-" + month,
      }
    })
    console.log(amountpaid)
    if (!amountpaid) {
      await Amountpaid.update(
        {
          date: year + "-" + month,
        },
        {
          where: {
            cardId: id,
          }
        }

      )
    }
    return sendJSONResponse(res, 200, "transaction added successfully");
  } catch (err) {
    return sendBadRequest(res, 500, `${err.message}`);
  }
};

exports.viewStatements = async (req, res) => {
  try {
    const { id, year, month } = req.params;

    const data = await Transaction.findAll({
      where: {
        cardId: id,
        transaction_date: year + "-" + month,
      },
    })
    const amountpaid = await Amountpaid.findOne({
      where: {
        cardId: id,
        date: year + "-" + month,
      }
    })
    const amount_paid=amountpaid?.dataValues.amount_paid || 0;

    return sendJSONResponse(res, 200, "Statement details", {data,amount_paid});
  } catch (err) {
    return sendBadRequest(res, 500, `${err.message}`);
  }
};

exports.amountPay = async (req, res) => {
  try {
    const { id, year, month } = req.params;
    const card = await Amountpaid.findOne({
      where: {
        cardId: id,
        date: year + "-" + month,
      },
    })
    if(card){
      await Amountpaid.update(
        {
          amount_paid: + req.body.amount + + card.amount_paid,
        },
        {
          where: {
            cardId: id,
          },
        }
      )
    return sendJSONResponse(res, 200, "Amount Paid successfully");
    }
  } catch (err) {
    return sendBadRequest(res, 500, `${err.message}`);
  }
};
