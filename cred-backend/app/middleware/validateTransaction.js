const db=require("../models");
const Transaction=db.transaction;



validateTransactionById=(req,res,next)=>{
    console.log(req.params);

    next();

}
const validateTransaction={
    validateTransactionById:validateTransactionById,
};
module.exports = validateTransaction;
