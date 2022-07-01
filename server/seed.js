//requiring depencies that will allow us to promise chain and find our JSON files
const path = require('path')
const fs = require ('fs').promises

//importing our data base and models
const {db} = require ('./db') //update 
const {User} = require ('./models/index')
const { Product} = require ('./models/index')

//seed function
const seed = async () =>{
  const userBuffer = await fs.readFile(user_seedPath)
  const {userdata} = JSON.parse(String(userBuffer))

  const productBuffer = await fs.readFile(product_seedPath)
  const {productdata} = JSON.parse(String(productBuffer))

  //resolving the promises 
  const userPromises = userdata.map( user => {
      User.create(user)
  })

  const productPromises = productdata.map( product => { 
      Product.create(product)
  })

  await Promise.all(userPromises)
  await Promise.all(productPromises)

  console.log('User and Motivation data succesfully populated!')

}

module.exports = seed; 