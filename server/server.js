 // imports
const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')

const seed = require('./seed')
const { db } = require('./db')