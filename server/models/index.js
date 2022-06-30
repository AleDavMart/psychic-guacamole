const { Sequelize, DataTypes, Model } = require('./db');

const { User } = require('./User')
const {Product} = require('./Product')
const {Cart} = require('./Cart')
const {Payment} = require ('./Payment')
const {Order} = require('./Order')


User.hasOne(Cart,{
  foreignKey: {userid : 'id'}
});
Cart.belongsTo(User);


Product.belongsTo(Cart, {
  foreignKey: {items: 'id'}
});
Cart.hasMany(Product);

Cart.belongsTo(Payment, {
  foreignKey : {
    merchantReference: 'id',
    amount: 'grandTotal'
  }
});
Cart.hasOne(Payment); // is this needed as a prevention?

Order.belongsTo(Payment, {
  foreignKey: {
    id: 'merchantReference', 
    currency: 'currency',
    orderGTotal: 'amount',
    brand: 'brand',
    paymentStatus: 'status'
  }
});

Order.hasOne(Order, {
  foreignKey: {
    userId: 'userid',
    orderItems: 'items',
    orderTotal: 'totalcost',
    orderTax: 'totalTax'
  }
})

module.exports= {User, Product, Cart, Payment, Order}


