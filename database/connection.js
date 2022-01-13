const mongoose = require('mongoose')
const config  = require('./config')

mongoose.connect(config.DB_URL).then(
    () => {
        console.log('已连接至MongoDB')
    },
    (err) => {
        console.error(err)
    }
)

module.exports = mongoose