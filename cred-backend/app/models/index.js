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
db.transaction=require("./transaction.model.js")(sequelize,Sequelize);
db.user.hasMany(db.card);
db.card.belongsTo(db.user);
db.card.hasMany(db.transaction);
db.transaction.belongsTo(db.card);


module.exports = db;
