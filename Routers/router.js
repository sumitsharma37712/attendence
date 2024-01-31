const express= require('express')
const session = require('express-session')
const router=new express.Router()



const cors = require("cors");
router.use(cors());
const bodyParser = require("body-parser"); // Middleware
const jwt = require("jsonwebtoken");
// const multer = require("multer");
const cookie = require("cookie-parser");
const { StudentAuth, StudentReg, AllStudentData } = require('../Controllers/StudentController');
const { TeacherAuth, TeacherReg, AllTeacherData } = require('../Controllers/TeacherController');
const salt = 10;
JWT_SECRET = process.env.JWT;




// Authentication Student
router.route('/api/create').post(StudentReg)
router.route('/api/auth').post(StudentAuth)
router.route('/api/student').get(AllStudentData)

// Authentication Teacher
router.route('/api/teacher/create').post(TeacherReg)
router.route('/api/teacher/auth').post(TeacherAuth)
router.route('/api/teacher').get(AllTeacherData)
// Authentication admin



module.exports=router