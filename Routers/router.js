const express= require('express')
const session = require('express-session')
const router=new express.Router()



const cors = require("cors");
router.use(cors());
const bodyParser = require("body-parser"); // Middleware
const jwt = require("jsonwebtoken");
// const multer = require("multer");
const cookie = require("cookie-parser");
const { EmployeeAuth, EmployeeReg, AllEmployeeData, EmployeeData } = require('../Controllers/EmployeeController');
const { TeacherAuth, TeacherReg, AllTeacherData } = require('../Controllers/TeacherController');
const { AdminCreate, AdminAuth } = require('../Controllers/AdminController');
const salt = 10;
JWT_SECRET = process.env.JWT;




// Authentication Employee
router.route('/api/create').post(EmployeeReg)
router.route('/api/auth').post(EmployeeAuth)
router.route('/api/employee').get(AllEmployeeData)

// Authentication Teacher
router.route('/api/teacher/create').post(TeacherReg)
router.route('/api/teacher/auth').post(TeacherAuth)
router.route('/api/teacher').get(AllTeacherData)
// Authentication admin
router.route('/api/admincreate').post(AdminCreate)
router.route('/api/adminauth').post(AdminAuth)


// get for perticular person data 
router.route('/api/employee/:id').get(EmployeeData)


module.exports=router