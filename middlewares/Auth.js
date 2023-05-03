const jwt = require('jsonwebtoken');
const user = require('../models/Users');

function auth(request, response, next) {
  const authToken = request.headers.token;
  const tag = request.headers.username;

  if (!authToken) {
    return response.json({
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
    return response.json({
      "success": false,
      "data": {},
      "error": {
        "code": "Authentication Failed",
        "message": "Token AWOL"
      },
      "status": 401
    });
  } else {
    // to-do decode incoming token and the token within, match users
    try {
      jwt.verify(token, 'key');
      console.log('Valid token');

      // check db

      user.find({'Token': token })
        .then((result) => {
          if (result.length == 1) {
            // verify
            
          } else {
            // return 
          }
        }).catch(() => {
          //return
        });

      next();
    } catch (error) {
      return response.json({
        "success": false,
        "data": {},
        "error": {
          "code": "Authentication Failed",
          "message": "Invalid Token" + error.name
        },
        "status": 401
      });
    }
  }
}

module.exports = auth;


//  headers: {
//   'authorization': 'Bearer ' + token
// }


