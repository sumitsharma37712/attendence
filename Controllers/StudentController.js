const asyncHandler=require('express-async-handler');
const Student =require("../databases/Model/Student/Stlog")
const jwt=require('jsonwebtoken')
const salt=10
const bcryptjs=require('bcryptjs')
// console.log(bcryptjs)
const StudentReg=asyncHandler(async(req,res)=>{
    const {name,contact,email,password:plainTextPassword,isStudent,subject,appartment,zip, country}=req.body;
    // console.log(email)
    password = await bcryptjs.hash(plainTextPassword, salt);
    // console.log(password)
    try {
        const check = await Student.findOne({ email: email });
        if(check){
            console.log("user exist");
        res.status(400).send({error:'user already registered'})
        }else{
            const response = await Student.create({
                name,email,contact,password,isStudent,subject,appartment,zip, country
                // filename:req.file.filename
            });
            res.send(response);
            console.log(`${email}, Registration Successfull`);
        }
    } catch (error) {
        console.log('error not create')
      res.status(400).send({error:'error'})

    }
    
})
const StudentAuth = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const emailver = await Student.findOne({ email })
    // console.log(emailver)
    // const passver =await Student.findOne({password})
    try{
        if(!emailver){
            res.json('somthing went wrong email not found.')
        }else if(await bcryptjs.compare(await password, emailver.password) ){
            const tdata={
                id:emailver._id,
                email:emailver.email,
                type:"student"
            }
            const token = jwt.sign(tdata, "erueoilfu34w894wedskndskf");
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
});


const AllStudentData=asyncHandler(async(req,res)=>{
    const user = await Student.find()
    res.json(user)
})







module.exports={StudentReg,StudentAuth,AllStudentData}