const user = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = ((request, response) => {

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
            "status": 400
        }

        return response.json(responseData);

    } else if (username == null || password == null) {

        var responseData = {
            "success": false,
            "data": {},
            "error": {
                "code": "Empty Field",
                "message": "Username or Password are Empty"
            },
            "status": 400
        }

        return response.json(responseData);

    } else {

        user.find({ 'username': username })
            .then((result) => {

                if (result.length != 0) {
                    hashedPassword = result[0].password;
                    type = result[0].Type;
                    uname = result[0].Name;

                    bcrypt.compare(password, hashedPassword)
                        .then((match) => {

                            if (!match) {
                                var responseData = {
                                    "success": false,
                                    "data": {},
                                    "error": {
                                        "code": "Comparison Failed",
                                        "message": "Wrong Password"
                                    },
                                    "status": 402
                                }

                                return response.json(responseData);
                            }
                            // jwt
                            var token = result[0].Token;

                            var identifier = jwt.sign(
                                {
                                  uid: username,
                                  name: request.headers.name == null ? '' : request.headers.name,
                                  token: token 
                                },
                                'process.env.JWT_KEY',
                                { expiresIn: '7200s' }
                              );

                            var responseData = {
                                "success": true,
                                "data": {
                                    token: identifier,
                                    user: username
                                },
                                "error": {},
                                "status": 200
                            }

                            return response.json(responseData);

                        }).catch((error) => {

                            // some error

                            var responseData = {
                                "success": false,
                                "data": {},
                                "error": {
                                    "code": "Comparison Failed",
                                    "message": "Wrong Password"
                                },
                                "status": 402
                            }

                            return response.json(responseData);
                        });
                } else {
                    // no user exists
                    var responseData = {
                        "success": false,
                        "data": {},
                        "error": {
                            "code": "Invalid User",
                            "message": "User Does Not Exist"
                        },
                        "status": 401
                    }

                    return response.json(responseData);
                }

            }).catch((error) => {
                var responseData = {
                    "success": false,
                    "data": {},
                    "error": {
                        "code": "Search Failed",
                        "message": "Query Execution Error"
                    },
                    "status": 500
                }

                return response.json(responseData);
            });
    }

});

module.exports = { login };