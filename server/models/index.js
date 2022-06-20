const { Sequelize, DataTypes, Model } = require('./db');

const { User } = require('./User')
const {Product} = require('./Product')
const {Cart} = require('./Cart')
const {Payment} = require ('./Payment');

User.hasMany(Payment, { //a shopper can shop muitlple times at a store
  foreignKey:{
    UserID: 'id' // this will tie the payments to a specific user
  }
}) 
User.hasOne(Cart,{
    foreignKey:{
      userid: 'id'
       // this will tie the open shopping cart to a user
    }
  })// can only have on active shopping cart


Cart.hasMany(Product, {
  foreignKey:{
    : 'id' // this will tie the payments to a specific user
  }
}) // can have multiple items in shopping cart

