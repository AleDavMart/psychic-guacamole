 // imports
const express = require('express')
const app = express()
const PORT = 3000
const pool = require("./models/db");

const seed = require('./seed');
const { db } = require('./db');
const {User, Product, Cart, Payment, Order}= require('./models/index');
const path = require ('path');
const bodyParser = require('body-parser')

app.use(cors());

//setting up morgan for request logging
app.use(morgan("dev"));

//Parsing JSON bodies
app.use(express.json());

// use seed to populate database
seed()


//Enabling environment variables by parsing the .env file - MAY NEED TO REMOVE LATER 
dotenv.config({
  path: './.env'
});

// -------DB Internal API Routes ------ //

//Getting all Users
app.get('/users', async (req, res)=>{
  try{
    const allUsers = await pool.query("SELECT * FROM User");
    res.json(allUsers.rows);
      
  }catch (error) {
    console.error(error);
}
});
