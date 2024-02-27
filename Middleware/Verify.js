const jwt = require ('jsonwebtoken');
const secretKey='Thisithetokenfoadminregiration';

const VerifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  const token = authHeader.split(" ")[1];
  if (authHeader) {
    jwt.verify (token, secretKey, (err, user) => {
      if (err) res.status (403).json ({error:'Token is not valid'});
      req.user = user;
      next ();
    });
  } else {
    return res.status (500).json ({error:'You are not authenticate'});
  }
};

const VerifyTokenAndAuthorization = (req, res, next) => {
  VerifyToken (req, res, () => {
    if (req.user.id === req.params.id || req.user.type) {
      next ();
    } else {
      return res.status (403).json ('You are not allowed to do that!');
    }
  });
};

const VerifyTokenAndAdmin = (req, res, next) => {
  VerifyToken (req, res, () => {
    console.log(req.user)
    if (req.user.type=='admin') {
      next ();
    } else {
      return res.status (403).json ({error:'You are not allowed to do that!'});
    }
  });
};
module.exports = {
  VerifyToken,
  VerifyTokenAndAdmin,
  VerifyTokenAndAuthorization,
};
