const Router = require('koa-router')
const mtapi = new Router()
const init = require('../middleware/mtInit')
const submitTag = require('../middleware/mtSubmitTag')

// /mtapi
mtapi.get('/init', init)

// mtapi/list
mtapi.post('/submit-tag', submitTag)

module.exports = mtapi
