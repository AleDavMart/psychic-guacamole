const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://localhost/PsychichGuacamole', {
  logging: (...msg) => console.log(msg) //Displays all log function call parameters
}); // passing a connection URI

try { // checking the connection to the db
  sequelize.authenticate();
   console.log('Connection has been established successfully.');
 } catch (error) {
   console.error('Unable to connect to the database:', error);
 }
