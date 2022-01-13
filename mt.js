const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')
//Koa中间件，解析Post请求的参数
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

app.use(bodyParser())
    .use(router.routes())

// 首页
app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
        ctx.response.status = 200
        ctx.response.body = 'index'
    }
    await next()
})

// 其他页面通过 router 加载
let urls = fs.readdirSync(__dirname + '/urls')
urls.forEach((element) => {
    let module = require(__dirname + '/urls/' + element)
    /*
      urls 下面的每个文件负责一个特定的功能，分开管理
      通过 fs.readdirSync 读取 urls 目录下的所有文件名，挂载到 router 上面
    */
    router.use('/' + element.replace('.js', ''), module.routes(), module.allowedMethods())
})

app.listen(3000)
console.log("正在监听3000端口...")
