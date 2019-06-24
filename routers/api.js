const express = require('express')
const User = require('../schema/users')
const router = express.Router()

//统一后台返回信息
let reponseDate = {}
//注册的后台处理
router.post('/register',(req,res)=>{
  console.log(req.body)
  let {username,password,repassword} = req.body

  if(username===''){
    reponseDate.code = 1
    reponseDate.message = '用户名不得为空'
    res.send(reponseDate)
    return
  }
  if(password===''){
    reponseDate.code = 2
    reponseDate.message = '密码不得为空'
    res.send(reponseDate)
    return
  }
  if(repassword===''){
    reponseDate.code = 3
    reponseDate.message = '密码不一致'
    res.send(reponseDate)
    return
  }


  User.findOne({
    username:username
  }).then((somebody)=>{
    if(somebody){ //如果用户已经注册
      reponseDate.code= 4
      reponseDate.message = '用户名已经注册过了'
      res.send(reponseDate)
      return
    }

    new User({
      username,
      password,
    }).save().then(()=>{ //返回前台信息
      reponseDate.code= 0
      reponseDate.message = '注册成功'
      res.send(reponseDate)
    })
  })
})

//登录的后台处理
router.post('/login',(req,res)=>{
  let {username,password} = req.body
  if(username===''){
    reponseDate.code = 1
    reponseDate.message = '用户名不得为空'
    res.send(reponseDate)
    return
  }
  if(password===''){
    reponseDate.code = 2
    reponseDate.message = '密码不得为空'
    res.send(reponseDate)
    return
  }

  //查询数据库中有没有用户注册过
  User.findOne({
    username,
    password,
  }).then((somebody)=>{
    if(!somebody){
       //没有注册过
      reponseDate.code= 3
      reponseDate.message = '该用户没有注册或者密码不正确'
      res.send(reponseDate)
      return
    }else{//注册过,下发cookie
      reponseDate.code= 0
      reponseDate.message = '登录成功'
      reponseDate.userInfo ={
        id:somebody._id,
        username: somebody.username,
        isAdmin: somebody.isAdmin
      }
      //下发cookie
      res.cookie('userInfo',JSON.stringify(reponseDate.userInfo),{
        maxAge: 90000000
      })
      res.send(reponseDate)
    }
  })
})

//退出的后台处理
router.get('/loginout',(req,res)=>{
  //清除cookie
  res.cookie('userInfo','')
  res.send('cookie清除成功')
})
module.exports = router