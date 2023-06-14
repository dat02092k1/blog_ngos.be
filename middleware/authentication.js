const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
     
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_KEY, (err, user) => {
        if (err) {
          return res.status(401).json("Invalid token");
        }
  
        req.user = user;
           
        next();
      });
    } else {
      return res.status(403).json("Access token not found");
    }
  };
  
  const roleAuthentication = (req, res, next) => {
    verifyToken(req, res, () => {
       
      if (req.user.id == req.params.id || req.user.role === "manager") {
        next();
      } else {
        res.status(403).json("You are not allowed to do this");
      }
    });
  };

  module.exports = {
    verifyToken, roleAuthentication
  }