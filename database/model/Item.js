/**
 * 构造model"Item"
*/
const mongoose  = require('../connection')
const Schema = mongoose.Schema

const TimeListItemSchema = new Schema({
    'activity': String,
    'description': String,
    'timestamp': Date
})

const Item = mongoose.model('Item', TimeListItemSchema)

module.exports = Item