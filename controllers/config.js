const Config = require('../models/config');

exports.getAppConfig = function (req, res, next) {
    var user = req.user;
    var type = req.params.type;
    console.log(type);
    Config.findByUserId(user._id, function (err, config) {
        if (err) {
            return res.status(500).send({
                message: "Error looking up User"
            });
        } else {
            delete config._id;
            delete config.userId;
            return res.status(200).send({
                data: type ? config[type] : config
            });
        }
    });
}

exports.addAppConfig = function (req, res, next) {
    var user = req.user;
    var config = req.body;

    if (!config || Object.keys(config).length === 0) {
        return res.status(400).send({
            message: "Config data is required"
        });
    }

    var key = Object.keys(config)[0];

    Config.addConfig(user._id, key, config[key], function (err, configData) {
        if (err) {
            return res.status(500).send({
                message: "Error adding config"
            });
        } else {
            return res.status(200).send();
        }
    });
};