const db = require("../models");
const { Op } = require('sequelize');
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
    });
    return sendJSONResponse(res, 201, "card added successfully!");
  } catch (err) {
    return sendBadRequest(res, 500, `${err.message}`);
  }
};

exports.addFamilyCard = async (req,res) =>{
  try {
    const family = await Card.findOne({
      where:{
        id: req.cardId
      }
    })
    const familyData = family.dataValues.familyMember || []
    const familymember=[...familyData,req.userId]
    const card = await Card.update(
        {
         familyMember:familymember 
        },
        {
          where: {
            id: req.cardId,
          },
        }
    
    )
    return sendJSONResponse(res, 201, "You are added as family member");

  }
  catch(err){
    return sendBadRequest(res, 400, `${err.message}`);
  }
}

exports.viewCard = async (req, res) => {
  try {
    const card = await Card.findAll({
      where: {
        [Op.or]:[
          {
            userId: req.userId
          },
          {
            familyMember:{
              [Op.contains]:[req.userId]
            }
          }
        ]
      },
    });
    return sendJSONResponse(res, 201, "All cards of user", card);
  } catch (err) {
    return sendBadRequest(res, 500, `${err.message}`);
  }
};

exports.viewCardById = async (req, res) => {
  try {
    const card = await Card.findOne({
      where: {
        [Op.or]:[
          {
          familyMember:{
            [Op.contains]:[req.userId]
          }
        },{
          userId: req.userId,
        }
      ],  
        id: req.params.id,
      },
    })
    data = card || 'you are not authorized to view this card';
    return sendJSONResponse(res, 201, "Card by ID", data);
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
    });

    const card = await Card.findOne({
      where: {
        id: id,
      },
    });
    if (card) {
      await card.update(
        {
          outstanding_amount: +card.outstanding_amount + +req.body.amount,
        },
        {
          where: {
            cardId: id,
          },
        }
      );
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
    });

    return sendJSONResponse(res, 200, "Statement details", data);
  } catch (err) {
    return sendBadRequest(res, 500, `${err.message}`);
  }
};

exports.amountPay = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findOne({
      where: {
        id: id,
      },
    });
    if (card) {
      await card.update(
        {
          outstanding_amount: +card.outstanding_amount - +req.body.amount,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return sendJSONResponse(res, 200, "Amount Paid successfully");
    }
  } catch (err) {
    return sendBadRequest(res, 500, `${err.message}`);
  }
};
