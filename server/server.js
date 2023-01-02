 // imports
const express = require('express')
const app = express()
const PORT = 3000
const pool = require("./models/db");

const seed = require('./seed')
const { db } = require('./db')

//setting up morgan for request logging
app.use(morgan("dev"));

//Parsing JSON bodies
app.use(express.json());

//Enabling environment variables by parsing the .env file - MAY NEED TO REMOVE LATER 
dotenv.config({
  path: './.env'
});

// -------DB Internal API Routes ------ //

//Getting all Users
app.get('/users', async (req, res)=>{
  try{
    const allUsers = await pool.query("SELECT * FROM products");
    res.json(allUsers.rows);
      
  }catch (error) {
    console.error(error);
}
});
