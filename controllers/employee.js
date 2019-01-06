const common = require('../helpers/common');
const User = require('../models/users');
const Config = require('../models/config');
const _ = require('lodash');

exports.create = function (req, res, next) {
    var user = req.user;
    var employee = req.body;

    if (!employee || Object.keys(employee).length === 0) {
        return res.status(400).send({
            message: "User data is required"
        });
    }

    if (!employee.phone || !employee.email || !employee.password || !employee.name ||
        !employee.username || !employee.type || !employee.designation) {
        return res.status(400).send({
            message: "Some Mandatory Field is Missing"
        });
    }

    // if(!common.validatePhone(employee.phone)) {
    //     return res.status(400).send({
    //         message: "Invalid Phone Number"
    //     });
    // }

    if (!common.validateEmail(employee.email)) {
        return res.status(400).send({
            message: "Invalid Email address"
        });
    }

    if (!common.validateUsername(employee.username)) {
        return res.status(400).send({
            message: "User Name should be between 3 and 64 characters long"
        });
    }

    if (findEmployee(user.employees, 'phone', employee.phone)) {
        return res.status(409).send({
            message: "A User already availble with this phone number"
        });
    } else if (findEmployee(user.employees, 'email', employee.email)) {
        return res.status(409).send({
            message: "A User already availble with this email address"
        });
    } else if (findEmployee(user.employees, 'username', employee.username)) {
        return res.status(409).send({
            message: "A User already availble with this username"
        });
    }

    // Set false by default
    employee.verify = {};
    employee.verify.phone = false;
    employee.verify.email = false;

    employee.phoneOTP = common.generateOTPKey();
    employee.emailOTP = common.generateOTPKey();

    employee.active = false;
    employee.created = new Date();
    employee.modified = new Date();
    employee.accessToken = common.rand();

    user.employees.push(employee);

    User.create(user, function (err, employeeData) {
        if (err) {
            console.error(err);
            return res.status(500).send({
                message: "Error Creating User Profile"
            });
        } else {
            return res.status(201).send({
                status: true
            });
        }
    })
}

function findEmployee(arr, key, value) {
    return _.find(arr || [], [key, value]);
}

exports.login = function (req, res, next) {
    var user = req.body;
    console.log("USER", user);
    if (!user || Object.keys(user).length === 0) {
        return res.status(400).send({
            message: "User data is required"
        });
    }

    if (!user.phone || !user.password) {
        return res.status(400).send({
            message: "Some Mandatory Field is Missing"
        });
    }

    User.lookUpEmployee(user.phone, function (err, employeeData) {
        if (err) {
            return res.status(500).send({
                message: "Error looking up for User"
            });
        } else if (employeeData) {
            let index = 0;
            // console.log(employeeData);
            for (var i = 0; i < employeeData.employees.length; i++) {
                if (employeeData.employees[i].phone === user.phone) {
                    index = i;
                }
            }

            if (!employeeData.employees[index].password(user.password)) {
                // Wrong passwowrd
                return res.status(200).send({
                    status: false
                });
            }

            var token = common.rand();

            User.createEmployeeSession(employeeData._id, user.phone, token, function (err, doc) {
                if (err) {
                    return res.status(500).send({
                        message: "Error in creating session"
                    });
                } else {
                    console.log(employeeData.employees[index]);
                    Config.findByUserId(employeeData._id, function (err, config) {
                        if (err) {
                            return res.status(500).send({
                                message: "Error in creating session"
                            });
                        } else {
                            return res.status(200).send({
                                status: true,
                                accessToken: token,
                                keys: ["appList", "leads", "sales", "products"],
                                config
                            });
                        }
                    });
                }
            });
        } else {
            return res.status(200).send({
                status: false
            });
        }
    });
}