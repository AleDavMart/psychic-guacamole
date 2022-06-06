const { Sequelize, DataTypes, Model } = require('sequelize');

const db = new Sequelize('postgresql://localhost/PsychichGuacamole', {
  define: {  //makes sure that sequelize does not pluralize the table name
    freezeTableName: true
  },
  logging: (...msg) => console.log(msg) //Displays all log function call parameters
}); // passing a connection URI

try { // checking the connection to the db
  db.authenticate();
  console.log('Connection has been established successfully.');
}catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = { db, DataTypes, Model }