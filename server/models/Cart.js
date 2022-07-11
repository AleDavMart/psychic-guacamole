const { db, DataTypes, Model } = require('./db');

class Cart extends Model{}

Cart.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  userid : {type: DataTypes.INTEGER},//make association to user
  items:{type: DataTypes.CHAR },// make association to products id - needs to be an array
  totalItems: { type: DataTypes.INTEGER}, 
  totalCost: { type: DataTypes.INTEGER},
  totaTax: {type: DataTypes.INTEGER},
  grandTotal: { type: DataTypes.INTEGER}
},{
  sequelize: db
})

module.exports = {Cart}