const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgresql://localhost/PsychichGuacamole', {
  logging: (...msg) => console.log(msg) //Displays all log function call parameters
}); // passing a connection URI

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
  }
},{
  sequelize,
  modelName: 'User'
});


try { // checking the connection to the db
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


