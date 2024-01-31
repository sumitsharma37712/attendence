const asyncHandler = require ('express-async-handler');
const Teacher = require ('../databases/Model/Teacher/Teacher');
const jwt = require ('jsonwebtoken');
const salt = 10;
const bcryptjs = require ('bcryptjs');

const TeacherReg = asyncHandler (async (req, res) => {
  const {
    name,
    contact,
    email,
    password: plainTextPassword,
    isTeacher,
  } = req.body;
  password = await bcryptjs.hash (plainTextPassword, salt);
  try {
    const check = await Teacher.findOne ({email: email});
    if (check) {
      console.log ('teacher exist');
      res.status (400).send ({error: 'teacher already registered'});
    } else {
      const response = await Teacher.create ({
        name,
        contact,
        email,
        password,
        isTeacher,
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


const TeacherAuth = asyncHandler(async( req,res)=>{
    const { email, password } = req.body;
    const emailver = await Student.findOne({ email })

    try{
        if(!emailver){
            res.json('somthing went wrong email not found.')
        }else if(await bcryptjs.compare(await password, emailver.password) ){
            const tdata={
                id:emailver._id,
                email:emailver.email,
                type:"teacher"
            }
            const token = jwt.sign(tdata, "erueoilfu34w894wedskf");
            res.cookie("jwt", token);

            // Store email in session (if needed)
            // req.session.email = email;

            // Respond with user data and token
            const data = res.json({
                id: emailver._id,
                email: emailver.email,
                token: token,
            });
        }else{
            res.json('somthing went wrong user not found.')
        }

    }catch(err){
        res.send(err)

    }

})

const AllTeacherData=asyncHandler(async(req,res)=>{
    const user = await Teacher.find()
    res.json(user)
})




module.exports={TeacherReg,TeacherAuth,AllTeacherData}