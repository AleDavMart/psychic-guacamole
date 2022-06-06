const { Sequelize, DataTypes, Model } = require('./db');

class Payment extends Model {}

Payment.init({
  //need to test payments to see what is provided in the reponse and create this model
},{
  sequelize
})

module.exports = {Payment}