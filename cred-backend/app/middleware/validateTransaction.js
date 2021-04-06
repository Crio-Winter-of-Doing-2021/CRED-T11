const db=require("../models");
const Transaction=db.transaction;



validateTransactionById=(req,res,next)=>{

    next();

}
const validateTransaction={
    validateTransactionById:validateTransactionById,
};
module.exports = validateTransaction;
