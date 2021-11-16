const Koa = require('koa')
//Koa中间件，解析Post请求的参数
const koaBodyParser = require('koa-bodyparser')
const app = new Koa()
app.use(koaBodyParser())
app.use(async (ctx,next)=>{
    if('req' in ctx.request.body && ctx.request.body.req === 'init'){
        console.log('检查cookie，控制访问页面')
        ctx.body = ctx.cookies.get('userName') === undefined ? 'select-user' : ctx.cookies.get('userName')
    }
    if ('userName' in ctx.request.body){
        ctx.cookies.set('userName', ctx.request.body.userName)
        ctx.body = 'success'
        await next()
    }
})


app.listen(3000,()=>{
    console.log('监听3000')
})