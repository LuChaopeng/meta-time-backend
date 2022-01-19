/**
 * 构造model"User"
 */
const mongoose = require('../connection')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    'uid': String,
    'name': String,
    'pwd': String
})

const User = mongoose.model('User', UserSchema)

module.exports = User