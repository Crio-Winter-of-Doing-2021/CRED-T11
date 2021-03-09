module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("users", {
      card_no: {
        type: Sequelize.STRING,
      },
      expiry_date: {
        type: Sequelize.DATE,
      },
      card_name: {
        type: Sequelize.STRING,
      },
    });
  
    return Card;
  };
  