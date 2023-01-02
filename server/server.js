 // imports
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const pool = require("./models/db");

const seed = require('./seed');
const { db } = require('./models/db');
const {User, Product, Cart, Payment, Order}= require('./models/index');
const path = require ('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(cors());

//setting up morgan for request logging
app.use(morgan("dev"));

//Parsing JSON bodies
app.use(express.json());

// use seed to populate database
seed()


// //Enabling environment variables by parsing the .env file - MAY NEED TO REMOVE LATER 
// dotenv.config({
//   path: './.env'
// });

//set up app to listen on set port
app.listen( PORT, () => {
  console.log(`Your server is now listening to port ${PORT}`)
})

// -------DB Internal API Routes ------ //

//Getting all Users
app.get('/users', async (req, res)=>{
  try{
    const allUsers = await User.findAll();
    res.json(allUsers);
      
  }catch (error) {
    console.error(error);
}
});

