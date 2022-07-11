const { db, DataTypes, Model } = require('./db');

class Product extends Model {}

Product.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true,primaryKey: true},
  name: { type: DataTypes.STRING},
  description: { type:DataTypes.STRING},
  price: {type: DataTypes.INTEGER},
  quantity: { type: DataTypes.INTEGER},
  picture: { type: DataTypes.STRING} // need to check if this is the correct data type for images
},{
  sequelize: db
})

module.exports = { Product}