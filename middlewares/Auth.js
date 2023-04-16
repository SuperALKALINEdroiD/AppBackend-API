const jwt = require('jsonwebtoken');
const user = require('../models/Users');

function auth(request, response, next) {
  const authToken = request.headers.authorization;

  if (!authToken) {
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
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // check db for user

    user.find({ 'Token': token })
      .then((result) => {

        if (result.length == 1) {
          next();
        } else {
          response.send({
            "success": false,
            "data": {},
            "error": {
              "code": "Authentication Failed",
              "message": "Token AWOL"
            },
            "status": 401
          });
        }

      }).catch((error) => {

      });

    next();

  } catch (err) {
    response.send({
      "success": false,
      "data": {},
      "error": {
        "code": "Authentication Failed",
        "message": "Invalid Token"
      },
      "status": 401
    }
    );
  }
}

module.exports = auth;


//  headers: {
//   'Authorization': 'Bearer ' + token
// }


