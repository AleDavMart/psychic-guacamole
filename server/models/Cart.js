const { Sequelize, DataTypes, Model } = require('./db');

class Cart extends Model{}

Cart.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  userid : {type: DataTypes.INTEGER, },//make association to user
  items:{ },// make association to products id
  totalItems: { type: DataTypes.INTEGER}, 
  totalCost: { type: DataTypes.INTEGER}
},{
  sequelize
})

module.exports = {Cart}