// environment
require("dotenv").config()

// packages
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

// constants
const app = express()

// db connection
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))

// app's third party middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
// app.use(express.static(path.join(__dirname, 'static')));

// custom middlewares
app.use(cors())

// importing routes
const user = require('./routes/user')
const student = require('./routes/student')

// adding routes
app.use('/user', user)
app.use('/student', student)


// home route
app.get('/', async (req, res)=>{
  res.send("Welcome to the home page")
})

db.once('open', async () => {
  console.log('Connected to Database')
  // listen on port
  app.listen(process.env.PORT, () =>{
    console.log("server started")
  });
})