//requiring depencies that will allow us to promise chain and find our JSON files
const path = require('path')
const fs = require ('fs').promises

//importing our data base and models
const {db} = require ('./db') //update 
const {User} = require ('./models/index')
const { Product} = require ('./models/index')

//seed function
