
const express = require('express')
const User = require('../schema/users')
const addCategory = require("../controller/category/add")
const category = require("../controller/category/index")
const updateCategory = require("../controller/category/update")
const deleteCategory = require("../controller/category/delete")

const deleteContent = require("../controller/content/delete")
const updateContent = require("../controller/content/update")
const addContent = require("../controller/content/add")
const content = require("../controller/content/index")
const router = express.Router()

//设置后台登录权限
router.use((req,res,next)=>{
  if(!req.userInfo.isAdmin){
    res.send('您不是管理猿,没有权限访问,可以找版主开通一下,十块,不,五块就行')
    return
  }
  next()
})
//渲染后台首页
router.get('/',(req,res)=>{
  res.render('admin/index',{
    userInfo: req.userInfo,
  })
})

//渲染用户管理页面
router.get('/user',(req,res)=>{
  /**
   *  分页 limit限制数据 count 找到多少数据 skip
   *  一页显示 x条数据
   *
   */
  let page = +req.query.page || 1 //当前页数
  let limit = 2 //每页显示2条

  //从数据库中读取所有用户信息
  User.count().then((count)=>{
    //最大页数
    let pageMax = Math.ceil(count/limit)
    page = Math.min(pageMax,page)
    let skip = (page-1)*limit
    User.find().limit(limit).skip(skip).then((results)=>{
      // console.log(results)
      res.render('admin/user/index',{
        userInfo:req.userInfo,
        results,
        page,
        pageMax
      })
    })
  })
})

//分类管理渲染分类首页
router.get('/category',category.showIndex)

//分类管理渲染分类页面
router.get('/category/add',addCategory.showAdd)

//接受添加分类的数组
router.post('/category/add',addCategory.add)


//分类修改渲染分类页面
router.get('/category/update',updateCategory.showUpdate)

//接受修改分类的数组
router.post('/category/update',updateCategory.update)

//分类删除渲染分类页面
router.get('/category/delete',deleteCategory.showDelete)

//接收分类删除渲染分类页面
router.post('/category/delete',deleteCategory.delete)

//添加内容渲染分类页面
router.get('/content/add',addContent.showAdd)

//添加内容渲染分类页面
router.post('/content/add',addContent.add)

//分类管理渲染分类页面
router.get('/content',content.showIndex)

//修改
router.get('/content/update',updateContent.showUpdate)

//删除
router.post('/content/update',updateContent.update)


//修改
router.get('/content/delete',deleteContent.showDelete)

//删除
router.post('/content/delete',deleteContent.delete)


module.exports = router