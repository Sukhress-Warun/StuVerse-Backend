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
    const response = await Student.createStudent(name, email, gender, address, phone, degree, degreeStatus, year, collegeName)
    if(response.created){
       return res.json({created: true, message: response.message, id: response.id})
    }
    else{
        return res.json({created: false, message: response.message})
    }
})

router.get("/get", async (req, res) => {
    const response = await Student.getAllStudents()
    if(response.found){
        return res.json({found: true, message: response.message, students: response.students})
    }
    else{
        return res.json({found: false, message: response.message, students:[]})
    }
})

router.get("/get/:id", async (req, res) => {
    const id = req.params.id
    const response = await Student.getStudent(id)
    if(response.found){
        return res.json({found: true, message: response.message, student: response.student})
    }
    else{
        return res.json({found: false, message: response.message})
    }
})

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const response = await Student.deleteStudent(id)
    if(response.deleted){
        return res.json({deleted: true, message: response.message})
    }
    else{
        return res.json({deleted: false, message: response.message})
    }
})

module.exports = router