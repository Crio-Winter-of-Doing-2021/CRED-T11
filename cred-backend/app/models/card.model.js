module.exports = (sequelize, Sequelize) => {
  const Card = sequelize.define("cards", {
    card_no: {
      type: Sequelize.STRING,
    },
    expiry_date: {
      type: Sequelize.STRING,
    },
    card_name: {
      type: Sequelize.STRING,
    },
    amount_paid: {
      type: Sequelize.STRING,
    },
  });

  return Card;
};
