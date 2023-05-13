const user = require('../models/Users');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const signup = ((request, response) => {

  let username = request.headers.username;
  let password = request.headers.pass;

  if (username == null && password == null) {

    var responseData = {
      "success": false,
      "data": {},
      "error": {
        "code": "Empty Fields",
        "message": "Username and Password are Empty"
      },
      "status": 403
    }

    return response.json(responseData);

  } else if (username == null || password == null) {

    if (username == null) {

      var responseData = {
        "success": false,
        "data": {},
        "error": {
          "code": "Username Field Empty",
          "message": "Username or Password are Empty"
        },
        "status": 403
      }

      return response.json(responseData);

    }

    var responseData = {
      "success": false,
      "data": {},
      "error": {
        "code": "Password Field Empty",
        "message": "Username or Password are Empty"
      },
      "status": 403
    }

    return response.json(responseData);

  } else {

    user.find({ 'username': username })
      .then((result) => {

        if (result.length != 0) {
          var responseData = {
            "success": false,
            "data": {},
            "error": {
              "code": "Duplicate",
              "message": "Already Exists"
            },
            "status": 409
          }

          return response.json(responseData);
        } else {

          bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
            .then((hash) => {

              var token = jwt.sign(
                {
                  uid: username,
                  name: request.headers.name == null ? '' : request.headers.name
                },
                process.env.JWT_KEY
              );

              let userData = new user({
                username: username.trim(),
                password: hash,
                DateTime: new Date().toString(),
                Type: 'USER',
                Name: request.headers.name == null ? '' : request.headers.name,
                Token: token
              });

              userData.save()
                .then((insertedDocument) => {

                  var responseData = {

                    "success": true,
                    "data": { 'message': 'Account Created' },
                    "error": {},
                    "status": 200
                  }

                  return response.json(responseData);

                }).catch((error) => {

                  var responseData = {
                    "success": false,
                    "data": {},
                    "error": {
                      "code": error,
                      "message": "New User Creation Error"
                    },
                    "status": 500
                  }

                  return response.json(responseData);

                });

            }).catch((error) => {

              var responseData = {
                "success": false,
                "data": {},
                "error": {
                  "code": error,
                  "message": "Something went wrong"
                },
                "status": 500
              }

              return response.json(responseData);
            });
        }
      }).catch((error) => {

        var responseData = {
          "success": false,
          "data": {},
          "error": {
            "code": error,
            "message": "Duplicate Lookup Error"
          },
          "status": 500
        }

        return response.json(responseData);

      });
  }
});

module.exports = { signup };
