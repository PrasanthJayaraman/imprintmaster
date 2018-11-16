var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var common = require("../helpers/common");

var verifySchema = new Schema({
    phone: {
        type: Boolean,
        default: false
    },
    email: {
        type: Boolean,
        default: false
    }
}, {
    _id: false
});

var addressSchema = new Schema({
    street: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    pincode: {
        type: Number,
    },
    country: {
        type: String,
        trim: true
    }
}, {
    _id: false
});

var employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    employeeId: {
        type: String
    },
    photo: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ["manager", "leader", "employee"]
    },
    designation: {
        type: String,
        required: true
    },
    active: { // make inactiv if some companies cancels our services, incase if they come back we could have their data back.
        type: Boolean,
        default: true,
        index: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    address: addressSchema,
    _password: {
        type: String,
        required: true
    },
    _salt: { // encrypt & decrypt using salt
        type: String
    },
    creadted: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date
    },
    accessToken: {
        type: String,
        index: true,
        unique: true,
        sparse: true
    },
    phoneVerificationKey: {
        type: String
    },
    reportingTo: {
        type: Schema.Types.ObjectId
    },
    verify: verifySchema
});

var userSchema = new Schema({
    username: { // login user name for company head
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    registrationId: {
        type: String,
        required: true,
        index: true
    },
    name: { // Main business name
        type: String,
        required: true,
        trim: true
    },
    photo: {
        type: String,
        trim: true
    },
    active: { // make inactiv if some companies cancels our services, incase if they come back we could have their data back.
        type: Boolean,
        default: false,
        index: true
    },
    landline: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    address: addressSchema,
    _password: {
        type: String,
        required: true
    },
    _salt: { // encrypt & decrypt using salt
        type: String
    },
    creadted: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date
    },
    accessToken: {
        type: String,
        index: true,
        unique: true,
        sparse: true
    },
    passwordResetKey: {
        type: String,
        index: true,
        unique: true,
        sparse: true //http://stackoverflow.com/a/21211640/1885921
    },
    passwordKeyValidTill: {
        type: Date
    },
    phoneOTP: {
        type: String
    },
    emailOTP: {
        type: String
    },
    verify: verifySchema,
    employees: [employeeSchema]
}, {
    collection: "user"
});

// Virtual Properties
userSchema.virtual('password')
    .get(function () {
        return function (password) {
            return (common.sha512(password + this._salt) === this._password);
        }
    })
    .set(function (value) {
        var salt = common.rand(512);
        this._salt = salt;
        this._password = common.sha512(value + salt);
    });

userSchema.statics.findByAuthKey = function (authKey, callback) {
    this.findOne({
        accessToken: authKey
    }, callback);
};

userSchema.statics.create = function (obj, callback) {
    new this(obj).save(callback);
};

userSchema.statics.lookUp = function (obj, callback) {
    this.findOne({
        $or: [{
            phone: obj.phone
        }, {
            email: obj.email
        }, {
            username: obj.username
        }]
    }, callback)
}

userSchema.methods.createSession = function (cb) {
    this.modified = new Date();
    this.accessToken = common.rand();
    this.save(cb);
};

module.exports = User = mongoose.model("User", userSchema);