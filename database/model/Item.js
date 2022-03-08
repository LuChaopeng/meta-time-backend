/**
 * 构造model"Item"
*/
const mongoose  = require('../connection')
const Schema = mongoose.Schema

const TimeListItemSchema = new Schema({
    'uid': String,
    'activity': String,
    'description': String,
    'timestamp': Date,
    'picture': String,
})

const Item = mongoose.model('Item', TimeListItemSchema)

module.exports = Item