const { db, DataTypes, Model } = require('./db');

class Order extends Model {}

//this will combine the information from Cart and Payment
Order.init({
  id: { type: DataTypes.STRING,primaryKey: true}, // should be the merchant reference - need to write a function to create this
  orderStatus: { type: DataTypes.STRING, allowNull: false}, //write a function to update order status according to payment status
  userid : {type: DataTypes.INTEGER}, // same as cart.userid
  orderItems: { type: DataTypes.CHAR}, // this is the same as cart.items - needs to be a string
  orderTotal: {type: DataTypes.INTEGER}, // = cart.totalCost
  orderTax: { type: DataTypes.INTEGER}, // = cart.totatTax
  orderGTotal: {type: DataTypes.INTEGER},// = Payment.amount
  paymentStatus: { type: DataTypes.STRING, allowNull: false}, //should reflect payment status 
  currency: { type: DataTypes.STRING}, // = Payment.currency
  brand: {type: DataTypes.STRING} // = Payment.brand
 
},{
  sequelize:db
}) 

module.exports = {Order}