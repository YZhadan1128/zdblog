const Koa = require("Koa")
const static = require("koa-static")
const views = require("koa-views")
const router = require("./routers")
const logger = require("koa-logger")
const {join} = require("path")
//设定成Koa 实例
const app = new Koa
//注册日志
app.use(logger())
