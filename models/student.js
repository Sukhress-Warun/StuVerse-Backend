// packages
const mongoose = require('mongoose')

// schema
// name, email, gender, address, phone, degree, degreeStatus, year, collegeName,
const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    degreeStatus: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    collegeName: {
        type: String,
        required: true
    }
})

// hooks
StudentSchema.pre('save', function(next) {
    this.increment();
    return next();
})

StudentSchema.statics.createStudent = async function (name, email, gender, address, phone, degree, degreeStatus, year, collegeName){
    const response = {
        created: false,
        message: "",
        id: ""
    }
    try{
        const student = await this.create({
            name: name,
            email: email,
            gender: gender,
            address: address,
            phone: phone,
            degree: degree,
            degreeStatus: degreeStatus,
            year: year,
            collegeName: collegeName
        })
        response.created = true
        response.message = "created successfully"
        response.id = student._id
    }
    catch(err){
        response.message = "server error " + err
    }
    return response
}

StudentSchema.statics.getStudent = async function (id){
    const response = {
        found: false,
        message: "",
        student: {}
    }
    try{
        const student = await this.findById(id)
        if(student){
            response.found = true
            response.message = "student found"
            response.student = student
        }
        else{
            response.message = "student not found"
        }
    }
    catch(err){
        response.message = "server error " + err
    }
    return response
}

StudentSchema.statics.getAllStudents = async function (){
    const response = {
        found: false,
        message: "",
        students: []
    }
    try{
        const students = await this.find()
        if(students){
            response.found = true
            response.message = "students found"
            response.students = students
        }
        else{
            response.message = "students not found"
        }
    }
    catch(err){
        response.message = "server error " + err
    }
    return response
}

module.exports = mongoose.model('Student', StudentSchema)