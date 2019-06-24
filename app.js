
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

//body-parser 中间件
app.use(bodyParser.urlencoded({
  extended: false
}))
//使用cookieparser解析中间件cookie数据
app.use(cookieParser())


//设置模板引擎ejs
app.set("view engine","ejs")
/*
*   根据不同模块划分不同路由
*
* */

app.use((req,res,next)=>{
  if(req.cookies.userInfo){ //已经登陆
    req.userInfo = JSON.parse(req.cookies.userInfo);
  }
  next()
})


//处理后台服务
app.use('/admin',require('./routers/admin'));
//处理前台服务
app.use('/',require('./routers/main'));
//处理注册服务
app.use('/api',require('./routers/api'));





//设置public默认路由
app.use(express.static('public'));




mongoose.connect("mongodb://localhost:27017/blog",
  {useNewUrlParser:true},(err)=>{
  if(err){
    console.log("连接失败")
  }
  app.listen(3000,()=>{
    console.log("数据库连接成功");
  })
})