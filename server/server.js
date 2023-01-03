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
const { userInfo } = require('os');

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
app.get('/user', async (req, res)=>{
  try{
    const allUsers = await User.findAll();
    res.json(allUsers);
      
  }catch (error) {
    console.error(error);
}
});

//Get a specfic user by userName
app.get ('/user/:userName', async (req, res) => {
  let userName = req.params.userName;
  let user = await User.findOne({ where: {userName: `${userName}`}});

  //NEED TO FIND A SPOT TO USE THIS LOGIC - SHOULD NOT RETURN SENSITIVE DATA
  // if(user.shoppingCart === null){
  //   return "Shopping cart empty";
  // }else{
  //   return user.shoppingCart;
  // };

  // if (user.orderHistory=== null){
  //   return "No Order History";
  // }else{
  //   return user.orderHis,tory;
  // };
  // return res.json([user.firstName,user.lastName, user.shoppingCart, user.orderHistory]);

  return res.json(user);

    
});

//Get a list of all products
app.get('/allproducts', async (res, req)=>{
  try{
    const allproduct = await Product.findAll();
    res.json(allproduct) //should return array of products

  }catch(error){
    console.error(error);
  }

});

//Get a list of all products in stock 

//