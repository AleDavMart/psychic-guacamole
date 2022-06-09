const { Sequelize, DataTypes, Model } = require('./db');

const { User } = require('./User')
const {Product} = require('./Product')
const {Cart} = require('./Cart')
const {Payment} = require ('./Payment');

User.hasMany(Payment) //can shop muitlple times at a store
User.hasOne(Cart)// can only have on active shopping cart
Cart.hasMany(Product) // can have multiple items in shopping cart

