/**
 * 处理页面提交标签的请求的中间件，对应API：/mtapi/submit-tag
 */
const {addItem} = require('../database/handler/itemHandler')

const mtSubmitTag = async function (ctx, next) {
    ctx.response.status = 200
    addItem(ctx.request.body)
    ctx.response.body = 'submit success'
    await next()
}

module.exports = mtSubmitTag