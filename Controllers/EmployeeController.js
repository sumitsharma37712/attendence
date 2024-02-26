const asyncHandler = require ('express-async-handler');
const Employee = require ('../databases/Model/Employee/Emplog');
const jwt = require ('jsonwebtoken');
const salt = 10;
const bcryptjs = require ('bcryptjs');
require('dotenv').config()
// console.log(bcryptjs)
const EmployeeReg = asyncHandler (async (req, res) => {
  const {
    name,
    contact,
    email,
    username,
    password: plainTextPassword,
    isEmployee,
    joindate,
    department,
    gender,
    designation,
    description,
  } = req.body;
  // console.log(email)
  password = await bcryptjs.hash (plainTextPassword, salt);
  // console.log(password)
  try {
    const check = await Employee.findOne ({email: email});
    const checkuser = await Employee.findOne ({username: username});
    if (check) {
      console.log ('user exist');
      res.status (400).send ({error: 'email already registered'});
    } else if (checkuser) {
      res.status (400).send ({error: 'user already registered'});
    } else {
      const response = await Employee.create ({
        name,
        email,
        username,
        contact,
        password,
        isEmployee,
        joindate,
        department,
        gender,
        designation,
        description,
        // filename:req.file.filename
      });
      res.send (response);
      console.log (`${email}, Registration Successfull`);
    }
  } catch (error) {
    console.log ('error not create');
    res.status (400).send ({error: 'error'});
  }
});

const EmployeeAuth = asyncHandler (async (req, res) => {
  const {email, password} = req.body;
  const emailver = await Employee.findOne ({email});
  // console.log(emailver)
  // const passver =await Employee.findOne({password})
  try {
    if (!emailver) {
      res.json ('somthing went wrong email not found.');
    } else if (await bcryptjs.compare (await password, emailver.password)) {
      const tdata = {
        id: emailver._id,
        email: emailver.email,
        type: 'employee',
      };
      const token = jwt.sign (tdata, 'Thisithetokenfoemployeeregiration');
      res.cookie ('jwt', token);

      // Store email in session (if needed)
      // req.session.email = email;

      // Respond with user data and token
      const data = res.json ({
        id: emailver._id,
        email: emailver.email,
        token: token,
      });
    } else {
      res.json ('somthing went wrong user not found.');
    }
  } catch (err) {
    res.send (err);
  }
});

const AllEmployeeData = asyncHandler (async (req, res) => {
  const user = await Employee.find ();
  res.json (user);
});

const EmployeeData=asyncHandler(async(req,res)=>{
    const id=req.params._id
    const emailvar= await Employee.findOne({id:id})
    const result=emailvar;
    res.json (result);
}) 


module.exports = {EmployeeReg, EmployeeAuth, AllEmployeeData,EmployeeData};
