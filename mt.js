const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')
//Koa中间件，解析Post请求的参数
const bodyParser = require('koa-bodyparser')
const { usrAC } = require('./database/handler/userHandler')
const cors = require('koa2-cors')

const app = new Koa()
const router = new Router()

global.UID = undefined

// 配置允许跨域，credentials是允许客户端发送cookie
app.use(cors({
    origin: 'http://111.229.176.245',
    credentials: true
}))
app.use(bodyParser())

/**
 * 访问控制，交给userHandler判断有无控制权限
 * 若访问登录接口/ursapi/login则放行给后续中间件，否则继续判断，若有cookie且校验成功，则记录下UID并放行，否则回登录页面
 */
app.use(async (ctx, next) => {
    console.log(`本次请求路径:${ctx.request.path}`)
    if (ctx.request.path === '/usrapi/login') {
        // 访问/ursapi/login直接放行
        await next()
    } else {
        if (ctx.cookies.get('uid')) {
            console.log(`访问控制：携带的cookie为${ctx.cookies}`)
            const uidInCookies = ctx.cookies.get('uid').substring(15)
            global.UID = await usrAC(uidInCookies)
            console.log(`访问控制：当前的全局UID：${global.UID}`)
            if (!global.UID) {
                console.log(`请求响应：cookie不匹配，返回"login"`)
                ctx.response.body = 'login'
            } else {
                // cookie与数据库信息校验成功，放行给后续中间件
                await next()
            }
        } else {
            console.log(`请求响应：无cookie，返回"login"`)
            ctx.response.body = 'login'
        }
    }
})

app.use(router.routes())

let apiList = fs.readdirSync(__dirname + '/api')
apiList.forEach((element) => {
    let module = require(__dirname + '/api/' + element)
    // api 下面的每个文件负责一组特定的功能，分开管理
    // 通过 fs.readdirSync 读取 api 目录下的所有文件名，挂载到 router 上面
    router.use('/' + element.replace('.js', ''), module.routes(), module.allowedMethods())
})

app.listen(3000)
console.log("正在监听3000端口...")
