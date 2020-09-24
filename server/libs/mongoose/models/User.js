//import mongoose from "mongoose";
//import validator from 'validator';
const mongoose = require('mongoose');
const validator = require('validator');
const log = require('../../log')(module);
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const conf = require('../../config');

const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: false
    },
    salt: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
            }
        }
    },
    role: {
        type: String,
        required: true
    },
    facebookId: {
        type: String,
        required: false
    },
    avatar : {
        type: String,
        required: false,
        default: 'https://www.gravatar.com/avatar/f5d2e745db058e22dbd577f4613ed9a4?s=60&d=mm'
    }
})


User.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
};

User.virtual('userId')
    .get(function () {
        return this.id;
    });

User.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    
    return jwt.sign({
        email: this.email,
        id: this.id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, conf.get('secretKey'));
}

User.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('base64');
        //more secure - this.salt = crypto.randomBytes(128).toString('base64');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () { return this._plainPassword; });


User.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
}

User.methods.toAuthJSON = function() {
    //console.log("role User: ", this.role);
    return {
      id: this.id,
      username: this.username,
      role: this.role,
      token: this.generateJWT(),
      avatar : this.avatar
    };
  };

const UserModel = mongoose.model('User', User);

module.exports = UserModel;