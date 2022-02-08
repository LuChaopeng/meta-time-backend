/**
 * 处理页面提交标签的请求的中间件，对应API：/mtapi/submit-tag
 */
const {addItem} = require('../database/handler/itemHandler')

const mtSubmitTag = async function (ctx, next) {
    ctx.response.status = 200
    const newID = await addItem(ctx.request.body)
    ctx.response.body = JSON.stringify({_id: newID})
    await next()
}

module.exports = mtSubmitTag