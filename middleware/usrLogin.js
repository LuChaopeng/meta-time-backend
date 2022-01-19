/**
 * 处理用户登录的中间件，对应API：/usrapi/login
 */
const { loginConfirmed } = require('../database/handler/userHandler')

const login = async function (ctx, next) {
    ctx.response.status = 200
    const confirmed = await loginConfirmed(ctx.request.body)
    if (confirmed) {
        ctx.cookies.set('uid',`account-cookie-${ctx.request.body.uid}`)
        ctx.response.body = 'success'
    } else {
        ctx.response.body = 'fail'
    }
    await next()
}

module.exports = login