/**
 * 处理页面提交标签的请求的中间件，对应API：/mtapi/submit-tag
 */
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../data/userdata.txt')

const mtSubmitTag = async function (ctx, next) {
    ctx.response.status = 200
    let data = ''
    try {
        if(fs.readFileSync(filePath, 'utf-8') !== '') {
            data = ','
        }
        try {
            data += JSON.stringify(ctx.request.body)
            fs.appendFileSync(filePath, data)
        } catch (err) {
            console.error(err)
        }
    } catch (err) {
        console.error(err)
    }
    ctx.response.body = 'submit success'
    await next()
}

module.exports = mtSubmitTag