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

checkCardById=(req,res,next)=>{
    Card.findOne({
      where:{
        id:req.params.id
      }
    }).then((card)=>{
      if(!card){
        res.status(400).send({message:"card doesn't exist"});
        return;
      }
      next();
      
    })
    

}
checkCardByUserId=(req,res,next)=>{
  Card.findOne({
    where:{
      id:req.params.id,
      userId:req.userId
    }
  }).then((card)=>{
    if(!card){
      res.status(401).send({message:"you are not authorized to view card"})
      return;
    }
    next();
  })
}
const validateCard = {
  checkCardValidation: checkCardValidation,
  checkCardById:checkCardById,
  checkCardByUserId:checkCardByUserId
};

module.exports = validateCard;
