const Koa = require("Koa")
const static = require("koa-static")
const views = require("koa-views")
const router = require("./routers/router")
const logger = require("koa-logger")
const {join} = require("path")
//设定成Koa 实例
const app = new Koa
//注册日志
app.use(logger())
//静态资源
app.use(static(join(__dirname,"public")))
//配置视图模板
app.use(views(join(__dirname,"views"),{
    extension: "pug"
}))

app.use(router.routes())
.use(router.allowedMethods())
app.listen(3000,()=>{
    console.log("监听成功,项目启动")
})