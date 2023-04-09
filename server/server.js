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
const { Client, Config, CheckoutAPI} = require ("@adyen/api-library");

// -------------------------Setting up Adyen Drop-in Configuration Object-----------------------

const configuration = {
  environment: 'test', 
  clientKey: 'test_IVAXL2NHVNB3RLMO76IS7H3FKY7IWKJO', // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
  analytics: {
    enabled: false // Set to false to not send analytics data to Adyen.
  },
  session: {
    id: 'CSAB4255EBF1D3812A', // Unique identifier for the payment session. - need to pull this from the session initiated
    sessionData: 'Ab02b4c0!BQABAgBF075hBuna2MpLYvE1LVcaaEgCby8+VMMBFryjRe7M4Er4kyLy8ysNnUVWFrLCdc4/XTSET8mSnFONdVxRan2hEEy5RXku3SpY0tHbLejWA522wK3snYR7SRKq7k/MlXOH1PCWZqJioiZ6s2ud9u/rq9K93E9vXRmAhipO2lk1ehzCgMyEOW73F1m7gEHmTcTC1gCJPY6A0Ma9y26ro+EbHVvy9dU+ZnRRBB63vnH4p82ZfrDxaF7ZVaqDnxjdcf5+4Lgwz+JFiaK3YQvsEj9IX3hFaMTUI3R+b6NKZEqr4FuSed9In4QjMNdpZars8z2gW43lZsqXlKJhNxE25R+SQNq7FhEjyp3CiLEPFv4twGigHCpIN8L4lE7QGtN7idqmiN8NxzHt9raESsswiH6zFVz5+SaJ7/LkztLV5AjhjoYFRB6pPIj1awj5Y6M9qifxMeB1A/zEszE54QNRoCzvrg+HtL6JBC5VCSjwDytkGlx1tqGZ16SobEgRPlB00JwVecCdLFwBjuKwAS4fyqqoUoa4JlgBcKIfNeUsMfiwsBvBDGzGnJeLF4M7QIjqSL19slAOgLBPVonq4DUDm6tvLHhGveNKkDP8kdvR6JxFIDjs9UTTeBMj1HHsRKWgsCLbJV31Mi1Mq1bVxrDe9Xi/CFEBVYCtldtwlzgsQmNpShDlCUE3cOXu1JhzGucM8lkcAEp7ImtleSI6IkFGMEFBQTEwM0NBNTM3RUFFRDg3QzI0REQ1MzkwOUI4MEE3OEE5MjNFMzgyM0Q2OERBQ0M5NEI5RkY4MzA1REMifdUgl7/3dGB0KXXtlz3UH2zx5yhnSAoD2t6jVnG1uLw6lszqoc68UR4xxRkOMQrW8j3Pc2E/OfGQwVIPU3KnRqBkUIe5hvgYFvC55aSI+0qNDxYX9eZltZbLOhH99kQOegLXDvkGNpL4gcXPDF9wljlWMuNn/yIHzPDShCU7DcqDqvbODq2K51xsrFkqqP7D09d+GjnTQkG/oXJ3EzlzxW67NaSM02ENQUDgO6pX1KMN3wSZJN2BEuh8AzTVfok527dDDhGghIAXbhcBK9IZ+SSooDg4HnSetFsmj7Jw7BUnqhxWambqUn+/kwYJUMT962namTS45IJ11SmTNUKVvgENlNKawgDnMkQ0iO1sU+5cQApnb0jH0eh7w1fyUxHRXqPwV1wjM5MekbZTGTgT4vYQWNacb0UHMd0RwvlHSKmoR+lxt8tVrlRffEhB4Q==' // The payment session data.
  },
  onPaymentCompleted: (result, component) => {
      console.info(result, component);
  },
  onError: (error, component) => {
      console.error(error.name, error.message, error.stack, component);
  },
  // Any payment method specific configuration. Find the configuration specific to each payment method:  https://docs.adyen.com/payment-methods
  // For example, this is 3D Secure configuration for cards:
  paymentMethodsConfiguration: {
    card: {
      hasHolderName: true,
      holderNameRequired: true,
      billingAddressRequired: true
    }
  }
};
//  

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

        if (newProduct.quantity != null) {
          await Product.update(
            { quantity: `${newProduct.quantity}` },
            { where: { id: `${prodID}` } }
          )
        }

        if (newProduct.picture != null) {
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


// Get all succesful payments processed by a User (aka Order History)
app.get('/payment/:userName', async (req, res) => {
  try {
    let userName = req.params.userName;
    let user = await User.findOne({ where: { userName: `${userName}` } });
    return res.json(user.orderHistory)
  } catch (error) {
    console.log(error);
  }
});


// Get current shopping cart for a user
app.get('/shoppingCart/:userName', async (req, res) => {
  try {
    let userName = req.params.userName;
    let user = await User.findOne({ where: { userName: `${userName}` } });
    return res.json(user.shoppingCart)
  } catch (error) {
    console.log(error);
  }
})

// Create an order (This is before the payment session is initiated and should feed this information into
// the payment sesssion call)


// -------------------------------------------ADYEN API CALLS ------------------------------------------------


// Starting a payment session - pulling the information from the shopping cart to send
app.post('https://checkout-test.adyen.com/v69/sessions', async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
  }
});


// Getting all the payment methods available in my store - To display on the front end for the shopper when checking out 
app.post('https://checkout-test.adyen.com/v69/paymentMethods', async(req, res) => {
try{

  let response = await checkout.paymentMethods;
  let paymentMethods = 
}catch(error){
  console.log(error);
}
})

