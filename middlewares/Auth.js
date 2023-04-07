function Auth(req, res, next) {
    console.log(req);
    next(); // Call the next middleware function in the chain
  }
  
  module.exports = Auth;
  