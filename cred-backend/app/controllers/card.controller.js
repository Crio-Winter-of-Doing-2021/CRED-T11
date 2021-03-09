const db = require("../models");
const Card = db.card;



exports.addcard=(req,res)=>{
    return Card.create({
        card_no:req.card_no,
        expiry_date:req.expiry_date,
        card_name:req.card_name,
        id:req.id,
    })
    .then((result)=>{
        console.log("card added successfully")
    })
    .catch(err=>console.log(err))
}
