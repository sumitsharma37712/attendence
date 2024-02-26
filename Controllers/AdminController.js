const expressAsyncHandler = require ('express-async-handler');
const Admin = require ('../databases/Model/admin/Adminf');
const jwt = require ('jsonwebtoken');
const salt = 10;
const bcryptjs = require ('bcryptjs');

const AdminCreate = expressAsyncHandler (async (req, res) => {
  const {
    name,
    contact,
    email,
    username,
    password: plainTextPassword,
    isAdmin,
    gender,
  } = req.body;
  // console.log(email)
  password = await bcryptjs.hash (plainTextPassword, salt);
  // console.log(password)
  try {
    const check = await Admin.findOne ({email: email});
    const checkuser = await Admin.findOne ({username: username});
    if (check) {
      console.log ('user exist');
      res.status (400).send ({error: 'email already registered'});
    } else if (checkuser) {
      res.status (400).send ({error: 'user already registered'});
    } else {
      const response = await Admin.create ({
        name,
        email,
        username,
        contact,
        password,
        isAdmin,
        gender,
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

const AdminAuth = expressAsyncHandler (async (req, res) => {
  const {email, password} = req.body;
  const emailver = await Admin.findOne ({email});
  // console.log(emailver)
  // const passver =await Admin.findOne({password})
  try {
    if (!emailver) {
      res.json ('somthing went wrong email not found.');
    } else if (await bcryptjs.compare (await password, emailver.password)) {
      const tdata = {
        id: emailver._id,
        email: emailver.email,
        type: 'admin',
      };
      const token = jwt.sign (tdata, 'Thisithetokenfoadminregiration');
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

module.exports={AdminCreate,AdminAuth}