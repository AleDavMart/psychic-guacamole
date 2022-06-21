const { Sequelize, DataTypes, Model } = require('./db');

class Payment extends Model {}

Payment.init({

  id: { type: DataTypes.INTEGER, autoIncrement: true,primaryKey: true},
  pspReference :{ type: DataTypes.STRING},
  merchantReference: {type: DataTypes.STRING}, //should be a combination of username and cart id
  authresultCode: { type: DataTypes.STRING}, 
  currency: {type: DataTypes.STRING }, //need to extract this from 'amount' object from response
  amount: { type: DataTypes.INTEGER}, //need to extract this from 'amount' object from response
  brand: { type: DataTypes.STRING}, // need to extract this from response 'paymentMethod' object
  type: { type: DataTypes.STRING}, // need to extract this from response 'paymentMethod' object
  status: { type: DataTypes.STRING} // needs to be update when webhooks come in


},{
  sequelize
})

module.exports = {Payment}