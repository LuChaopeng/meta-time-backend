const Router = require('koa-router')
const usrapi = new Router()
const login = require('../middleware/usrLogin')

usrapi.post('/login', login)

module.exports = usrapi
