/**
 * 处理页面初始化请求的中间件，对应API：/mtapi/init
 */
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../data/userdata.txt')

const mtInit = async function (ctx, next) {
    ctx.response.status = 200
    let data = ''
    try {
        const content = fs.readFileSync(filePath, 'utf-8')
        data = `[${content}]`
    } catch (err) {
        console.error(err)
    }
    ctx.response.body = data
    await next()
}

module.exports = mtInit