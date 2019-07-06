const Sequelize = require('sequelize');
const UserModel = require('./modules/user');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URL, {
    define: {
        freezeTableName: false,
    }
});
const User = UserModel(sequelize, Sequelize);

if (process.env.DB_URL) {
    console.log(`process.db url is here`)
}

sequelize.sync().then(() => {
  console.log('User db and user table have been created');
});

module.exports = User;
