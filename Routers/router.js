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
const salt = 10;
JWT_SECRET = process.env.JWT;




// Authentication 
router.route('/api/create').post(StudentReg)
router.route('/api/auth').post(StudentAuth)
router.route('/api/student').get(AllStudentData)




module.exports=router