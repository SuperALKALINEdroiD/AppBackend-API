const jwt = require('jsonwebtoken');
const user = require('../models/Users');

function auth(request, response, next) {
  const authToken = request.headers.authorization;

  console.log(authToken.split(' '));

  if (!authToken) {
    response.send({
      "success": false,
      "data": {},
      "error": {
        "code": "Authentication Failed",
        "message": "No Token"
      },
      "status": 401
    });
  }

  const token = authToken.split(' ')[1];

  if (!token) {
    response.send({
      "success": false,
      "data": {},
      "error": {
        "code": "Authentication Failed",
        "message": "Token AWOL"
      },
      "status": 401
    }
    );
  } else {
    // check db

    user.find({ 'Token': token })
      .then((result) => {

        if (result.length == 1) {  // unique jwt tokens
          next();
        } else {
          response.send({
            "success": false,
            "data": {},
            "error": {
              "code": "Authentication Failed",
              "message": "User Not Found"
            },
            "status": 401
          });
        }

      }).catch((error) => {
        response.send({
          "success": false,
          "data": {},
          "error": {
            "code": error,
            "message": "Invalid Token"
          },
          "status": 401
        });
      });
  }

}


module.exports = auth;


//  headers: {
//   'Authorization': 'Bearer ' + token
// }


