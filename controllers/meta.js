var Meta = require('../models/meta');
var _ = require('lodash');

exports.addMeta = function (req, res, next) {
    var user = req.user;
    var data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).send({
            message: "Some Mandatory field is missing"
        });
    }

    if (!data.title || !data.name || !data.fields || data.fields.length === 0) {
        return res.status(400).send({
            message: "Some Mandatory field is missing"
        });
    }

    data.userId = user._id;
    data.created = new Date();
    data.active = true;

    Meta.create(data, function (err, metaData) {
        if (err) {
            return res.status(500).send({
                message: "Error Saving Meta data"
            });
        } else {
            return res.status(201).send();
        }
    });
}

exports.getMeta = function (req, res, next) {
    var user = req.user;
    var name = req.params.name;

    if (!name) {
        return res.status(400).send({
            message: "Meta Name is missing"
        });
    }

    Meta.getMeta(user._id, name, function (err, meta) {
        if (err) {
            return res.status(500).send({
                message: "Error Saving Meta data"
            });
        } else {
            let data = meta.toJSON();
            data.fields = _.sortBy(meta.fields, 'priority');
            return res.status(200).send(data);
        }
    });
}

exports.updateMeta = function (req, res, next) {
    var user = req.user;
    var data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).send({
            message: "Some Mandatory field is missing"
        });
    }

    if (!data.title || !data.name || !data.fields || data.fields.length === 0) {
        return res.status(400).send({
            message: "Some Mandatory field is missing"
        });
    }

    data.modified = new Date();

    Meta.getByUserId(user._id, function (err, meta) {
        if (err) {
            return res.status(500).send({
                message: "Error Looking for Meta data"
            });
        } else {
            meta.name = data.name;
            meta.title = data.title;
            meta.fields = data.fields;
            meta.save(function (err) {
                if (err) {
                    return res.status(500).send({
                        message: "Error Updating Meta data"
                    });
                } else {
                    return res.status(200).send();
                }
            });
        }
    });
}