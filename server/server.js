// imports
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const pool = require("./models/db");

const seed = require('./seed');
const { db } = require('./models/db');
const { User, Product, Cart, Payment, Order } = require('./models/index');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { userInfo } = require('os');
const { Op, where } = require('sequelize');

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
app.listen(PORT, () => {
  console.log(`Your server is now listening to port ${PORT}`)
})

// -------DB Internal API Routes ------ //

//Getting all Users
app.get('/user', async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.json(allUsers);

  } catch (error) {
    console.error(error);
  }
});

//Get a specfic user by userName
app.get('/user/:userName', async (req, res) => {

  try {
    let userName = req.params.userName;
    let user = await User.findOne({ where: { userName: `${userName}` } });

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
  } catch {
    let error = new SyntaxError('User does not exists or is misspelled');
    return (error);

    // The error function is not working here - it only returns null 
  }


});

//Get a list of all products
app.get('/product', async (req, res) => {
  try {
    const allproduct = await Product.findAll();
    res.json(allproduct) //should return array of products

  } catch (error) {
    console.error(error);
  }

});

//Get a specific product by id
app.get('product/:id', async (req, res) => {
  try {
    let productID = req.params.id;
    let product = await Product.findByPk(productID);

    return res.json(product);

  } catch (error) {

  }
})

//Get  list of all products in stock 
app.get('/product/stock', async (req, res) => {
  try {
    let productInStock = await Product.findAll({
      where: {
        quantity: {
          [Op.gt]: 0
        }
      }
    });
    res.json(productInStock);
  } catch (error) {
    console.error(error);
  }
});

//Update a product by id or create a new one if the ID does not exist
app.patch('/product/:id', async (req, res) => {
  try {

    let prodID = req.params.id

    let newProduct = req.body //retrieving the request body to use fields for new product

    const [product, created] = await Product.findOrCreate({
      where: { id: `${prodID}` },
      defaults: {
        name: `${newProduct.name}`,
        description: `${newProduct.description}`,
        price: `${newProduct.price}`,
        quantity: `${newProduct.quantity}`,
        picture: `${newProduct.picture}`
      }
    });

    if (product) {

      if (newProduct.name === null) {
        return res.json('Error: "name" parameter is required to update the product');
      } else {
        //checking to see which fields from the body is not empty to update the products info
        if (newProduct.description != null) {
          await Product.update(
            { description: `${newProduct.description}` },
            { where: { id: `${prodID}` } }
          )
        }

        if (newProduct.price != null) {
          await Product.update(
            { price: `${newProduct.price}` },
            { where: { id: `${prodID}` } }
          )
        }

        if(newProduct.quantity != null){
          await Product.update(
            { quantity: `${newProduct.quantity}` },
            { where: { id: `${prodID}` } }
          )
        }

        if(newProduct.picture != null){
          await Product.update(
            { picture: `${newProduct.picture}` },
            { where: { id: `${prodID}` } }
          )
        }

        return res.json(product); // Will return the updated version of the product
      }
    }
    return res.json(created);

  }
  catch (error) {
    console.log(error);
  }
});

// Get all payments processed 
app.get('/payment/', async (req, res) => {
  try {
    const allPayments = await Payment.findAll();
    res.json(allPayments);

  } catch (error) {
    console.log(error);
  }
});


// Get all payments processed by a User -- NEED to test later once
app.get('/payment/:userName', async (req, res) => {
  try {
    let userName = req.params.userName;
    let user = await User.findOne({ where: { userName: `${userName}` } });
    return res.json(user.orderHistory)
  } catch(error){
    console.log(error);
  }
})


// Get shopping cart for a user



// Get all past orders for a user 


