// packages
const express = require('express')
const multer  = require('multer')
const upload = multer()

// constants
const router = express.Router()

// models
const Student = require('../models/student')

// routes /student/
router.post("/add", upload.none(), async (req, res) => {
    const { name, email, gender, address, phone, degree, degreeStatus, year, collegeName} = req.body
    console.log(req.body)
    const response = await Student.createStudent(name, email, gender, address, phone, degree, degreeStatus, year, collegeName)
    if(response.created){
       res.json({created: true, message: response.message, id: response.id})
    }
    else{
        res.json({created: false, message: response.message})
    }
})

router.get("/get", async (req, res) => {
    const response = await Student.getAllStudents()
    if(response.found){
        res.json({found: true, message: response.message, students: response.students})
    }
    else{
        res.json({found: false, message: response.message})
    }
})

router.get("/get/:id", async (req, res) => {
    const id = req.params.id
    const response = await Student.getStudent(id)
    if(response.found){
        res.json({found: true, message: response.message, student: response.student})
    }
    else{
        res.json({found: false, message: response.message})
    }
})

module.exports = router