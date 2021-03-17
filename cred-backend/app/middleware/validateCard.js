const db = require("../models");
const Card = db.card;
const luhnCheck = require("../utils/utils.js");
const {sendBadRequest} = require("../utils/handle");


checkCardValidation = async (req, res, next) => {
  try{
    const card_no = parseInt(req.body.card_no)
    if (luhnCheck(card_no)) {
      const card = await Card.findOne({
        where: {
          card_no: req.body.card_no,
        },
    })
    if (card) {
      return sendBadRequest(res,400,"Failed! Card already exist!");
    }
    }else {
      return sendBadRequest(res,400,"Invalid card number!");
    }
    next();
  }catch(err){
    return sendBadRequest(res,500,`${err.message}`)
  }
  
};

checkCardById = async (req,res,next) => {
  try{
    const card = await Card.findOne({
      where:{
        id:req.params.id
      }
    })
    if(!card){
      return sendBadRequest(res,400,"card doesn't exist");
    }
    next();
  }catch(err){
    return sendBadRequest(res,500,`${err.message}`)
  }
  
}
checkCardByUserId = async (req,res,next) => {
  try{
    const card = await Card.findOne({
      where:{
        id:req.params.id,
        userId:req.userId
      }
    })
    if(!card){
      return sendBadRequest(res,401,"You are not authorized to view card");
    }
    next();
  }catch(err){
    return sendBadRequest(res,500,`${err.message}`)
  }
  
};

const validateCard = {
  checkCardValidation: checkCardValidation,
  checkCardById:checkCardById,
  checkCardByUserId:checkCardByUserId
};

module.exports = validateCard;
