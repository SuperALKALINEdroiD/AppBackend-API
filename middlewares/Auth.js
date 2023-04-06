function Auth(req, res, next) {
    // Do some processing on the request object
    console.log('Example middleware function called');
    next(); // Call the next middleware function in the chain
  }
  
  module.exports = Auth;
  