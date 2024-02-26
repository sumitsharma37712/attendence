const jwt = require ('jsonwebtoken');

const VerifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  const token = authHeader.split (' ')[1];
  if (authHeader) {
    jwt.verify (token, process.env.JWT, (err, user) => {
      if (err) res.status (403).json ('Token is not valid');
      req.user = user;
      next ();
    });
  } else {
    return res.status (500).json ('You are not authenticate');
  }
};

const VerifyTokenAndAuthorization = (req, res, next) => {
  VerifyToken (req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next ();
    } else {
      return res.status (403).json ('You are not allowed to do that!');
    }
  });
};

const VerifyTokenAndAdmin = (req, res, next) => {
  VerifyToken (req, res, () => {
    if (req.user.isAdmin) {
      next ();
    } else {
      return res.status (403).json ('You are not allowed to do that!');
    }
  });
};
module.exports = {
  VerifyToken,
  VerifyTokenAndAdmin,
  VerifyTokenAndAuthorization,
};
