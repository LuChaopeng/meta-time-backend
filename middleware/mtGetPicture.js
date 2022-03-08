/**
 * 处理获取图片请求的中间件，对应API：/mtapi/get-picture
 */
const { getPicture } = require('../database/handler/itemHandler')

const mtGetPicture = async function (ctx, next) {
    ctx.response.status = 200
    console.log('接口/mtapi/get-picture被成功访问')
    await getPicture(ctx.request.body.id).then( (res) => {
        ctx.response.body = res
    })
    await next()
}

module.exports = mtGetPicture