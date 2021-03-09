const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.card = require("./card.model.js")(sequelize, Sequelize);

db.user.hasMany(db.card);
db.card.belongsTo(db.user)
// db.user.hasMany(db.card, {foreignKey: 'id', sourceKey: 'card_no'});
// db.card.belongsTo(db.user, {foreignKey: 'id', targetKey: 'card_no'})


module.exports = db;
