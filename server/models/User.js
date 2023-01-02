const { db, DataTypes, Model } = require('./db');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },password:{
      type: DataTypes.STRING,
      allowNull:false
  },
  shoppingCart :{
    type: DataTypes.CHAR,
    allowNull: true
  },
  orderHistory:{
    type : DataTypes.CHAR
  }
},{
  sequelize: db
});

module.exports = { User }

