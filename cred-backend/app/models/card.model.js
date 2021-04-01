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
    outstanding_amount: {
      type: Sequelize.STRING,
    },
    familyMember: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
  });

  return Card;
};
