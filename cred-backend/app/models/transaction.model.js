module.exports=(sequelize,Sequelize)=>{
    const Transaction=sequelize.define("transactions",{
        amount:{
            type:Sequelize.STRING,
        },
        vendor:{
            type:Sequelize.STRING,
        },
        transaction_type:{
            type:Sequelize.ENUM,
            values:['credit','debit'],
        },
        transaction_date:{
            type:Sequelize.STRING,
        },
        category:{
            type:Sequelize.STRING,
        }
    });
    
    return Transaction;
};