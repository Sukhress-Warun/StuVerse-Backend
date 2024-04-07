// packages
const mongoose = require('mongoose')
const bcrypt = require ('bcrypt')

// schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    
})

// hooks
UserSchema.pre('save', function(next) {
    this.increment();
    return next();
})

// static-methods
UserSchema.statics.createUser = async function (email, password){
    const response = {
        created: false,
        message: "",
        id: ""
    }
    const userEmailExist = await this.exists({email: email})
    if(userEmailExist){
        response.message = "email already exist"
        return response
    }
    try{
        password = await bcrypt.hash(password, 10)
        const user = await this.create({
            email: email,
            password: password,
        })
        response.created = true
        response.message = "created successfully"
        response.id = user._id
    }
    catch(err){
        response.message = "server error " + err
    }
    return response
}

UserSchema.statics.authenticate = async function (email, password) {
    const response = {
        auth: false,
        message: "",
        id: ""
    }
    const user = await this.findOne({email: email})
    if(user === null){
        response.message = "email doesn't exist"
        return response
    }
    let result = await bcrypt.compare(password, user.password)
    if(!result){
        response.message = "incorrect password"
        return response
    }
    response.auth = true
    response.message = "authenticated successfully"
    response.id = user._id
    return response
}

module.exports = mongoose.model('User', UserSchema)