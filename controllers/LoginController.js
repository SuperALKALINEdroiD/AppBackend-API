const user = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

        response.send(responseData);

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

        response.send(responseData);

    } else {

        user.find({ 'username': username })
            .then((result) => {

                if (result.length != 0) {
                    hashedPassword = result[0].password;
                    type = result[0].Type;
                    uname = result[0].Name;


                    bcrypt.compare(password, hashedPassword)
                        .then(() => {
                            // jwt
                            var token = jwt.sign(
                                {
                                    uid: username,
                                    type: type,
                                    name: uname,
                                    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
                                },
                                'key'
                            );

                            var responseData = {
                                "success": true,
                                "data": {
                                    token: token,
                                },
                                "error": {},
                                "status": 400
                            }

                            response.send(responseData);

                        }).catch((error) => {
                            // wrong password ?

                            var responseData = {
                                "success": false,
                                "data": {},
                                "error": {
                                    "code": "Comparison Failed",
                                    "message": "Wrong Password"
                                },
                                "status": 400
                            }

                            response.send(responseData);
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
                        "status": 400
                    }

                    response.send(responseData);
                }

            }).catch((error) => {
                var responseData = {
                    "success": false,
                    "data": {},
                    "error": {
                        "code": "Search Failed",
                        "message": "Query Execution Error"
                    },
                    "status": 400
                }

                response.send(responseData);
            });
    }

});

module.exports = { login };