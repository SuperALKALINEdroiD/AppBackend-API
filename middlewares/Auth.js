const jwt = require('jsonwebtoken');
const user = require('../models/Users');
require('dotenv').config();

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
      var decoded = jwt.verify(token, process.env.JWT_KEY);
      // check db

      user.find({ 'Token': decoded.token })
        .then((result) => {
          if (result.length == 1) {
            if (result[0].username === tag) {
              next();
            } else {
              return response.json({
                "success": false,
                "data": {},
                "error": {
                  "code": "Authentication Failed",
                  "message": "Invalid User"
                },
                "status": 401
              });
            }
          } else {
            // return
            return response.json({
              "success": false,
              "data": {},
              "error": {
                "code": "Authentication Failed",
                "message": "Auth Fail: JWT Verfication"
              },
              "status": 401
            });
          }
        }).catch(() => {
          //return
          return response.json({
            "success": false,
            "data": {},
            "error": {
              "code": "Authentication Failed",
              "message": "Invalid Token" + error.name
            },
            "status": 401
          });
        });
    } catch (error) {
      return response.json({
        "success": false,
        "data": {},
        "error": {
          "code": "Authentication Failed",
          "message": "Token Verification Failed" + error.name
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


