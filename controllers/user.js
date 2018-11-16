const common = require('../helpers/common');
const User = require('../models/users');
const Config = require('../models/config');

exports.create = function (req, res, next) {
    var user = req.body;

    if (!user || Object.keys(user).length === 0) {
        return res.status(400).send({
            message: "User data is required"
        });
    }

    if (!user.phone || !user.email || !user.password || !user.name || !user.username) {
        return res.status(400).send({
            message: "Some Mandatory Field is Missing"
        });
    }    

    // if(!common.validatePhone(user.phone)) {
    //     return res.status(400).send({
    //         message: "Invalid Phone Number"
    //     });
    // }

    if (!common.validateEmail(user.email)) {
        return res.status(400).send({
            message: "Invalid Email address"
        });
    }

    if (!common.validateUsername(user.username)) {
        return res.status(400).send({
            message: "User Name should be between 3 and 64 characters long"
        });
    }

    User.lookUp(user, function (err, existingUser) {
        if (err) {
            return res.status(500).send({
                message: "Error looking up User"
            });
        } else if (existingUser) {
            if (existingUser.phone == user.phone) {
                return res.status(409).send({
                    message: "A User already availble with this phone number"
                });
            } else if (existingUser.email == user.email) {
                return res.status(409).send({
                    message: "A User already availble with this email address"
                });
            } else {
                return res.status(409).send({
                    message: "A User already availble with this username"
                });
            }
        } else {
            // Set false by default
            user.verify = {}; 
            user.verify.phone = false;
            user.verify.email = false;

            user.phoneOTP = common.generateOTPKey();
            user.emailOTP = common.generateOTPKey();

            user.active = false;
            user.created = new Date();
            user.modified = new Date();
            user.registrationId = common.registration();
            user.accessToken = common.rand();

            User.create(user, function (err, userData) {
                if (err) {
                    console.error(err);
                    return res.status(500).send({
                        message: "Error Creating User Profile"
                    });
                } else {
                    res.status(201).send({
                        status: true                        
                    });
                    var configData = new Config({userId: userData._id});
                    configData.save();
                    return next();
                }
            })
        }
    });    
}

exports.login = function(req, res, next){
    var user = req.body;

    if (!user || Object.keys(user).length === 0) {
        return res.status(400).send({
            message: "User data is required"
        });
    }

    User.lookUp(user, function (err, userData) {
        if (err) {
            return res.status(500).send({
                message: "Error looking up for User"
            });
        } else if (userData) {
            if (!userData.password(user.password)) {
                // Wrong passwowrd
                return res.status(200).send({
                    status: false                    
                });
            }
            userData.createSession(function (err, loggedInUser) {
                if (err) {
                    return res.status(500).send({
                        message: "Error in creating session"
                    });
                } else {
                    return res.status(200).send({
                        status: true,
                        accessToken: userData.accessToken
                    });
                }
            })
        } else {
            return res.status(200).send({
                status: false
            });
        }
    });
}
