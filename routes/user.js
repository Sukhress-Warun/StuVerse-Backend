// packages
const express = require('express')

// constants
const router = express.Router()

// models
const User = require('../models/user')

// routes /user/

router.post('/signup', async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    const response = await User.createUser(email, password)
    if(response.created){
        res.json({created: true, message: response.message, id: response.id})
    }
    else{
        res.json({created: false, message: response.message})
    }
})

router.post("/login", async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    const response = await User.authenticate(email, password)
    if(response.auth){
       res.json({auth: true, message: response.message, id: response.id})
    }
    else{
        res.json({auth: false, message: response.message})
    }
})

module.exports = router