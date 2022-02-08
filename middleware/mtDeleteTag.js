/**
 * 处理删除标签的请求的中间件，对应API: /mtapi/delete-tag
 */

const { delItem } = require('../database/handler/itemHandler')

const mtDeleteTag = async function (ctx, next) {
    ctx.response.status = 200
    await delItem(ctx.request.body.id)
    await next()
}

module.exports = mtDeleteTag