/**
 * 处理页面初始化请求的中间件，对应API：/mtapi/init
 */
const { initList } = require('../database/handler/itemHandler')

const mtInit = async function (ctx, next) {
    ctx.response.status = 200
    let itemList = undefined
    await initList().then( (res) => {
        itemList = res
    })
    if (itemList) {
        ctx.response.body = itemList
    } else {
        console.error('数据库查找失败！')
    }
    await next()
}

module.exports = mtInit