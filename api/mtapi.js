const Router = require('koa-router')
const mtapi = new Router()
const init = require('../middleware/mtInit')
const submitTag = require('../middleware/mtSubmitTag')
const deleteTag = require('../middleware/mtDeleteTag')
const getPicture = require('../middleware/mtGetPicture')

// /mtapi
mtapi.get('/init', init)

// mtapi/list
mtapi.post('/submit-tag', submitTag)

mtapi.post('/get-picture', getPicture)

mtapi.post('/delete-tag', deleteTag)

module.exports = mtapi
