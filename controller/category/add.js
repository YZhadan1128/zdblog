const Category = require('../../schema/category')

//展示添加分类
exports.showAdd = function(req,res){
  res.render("admin/category/add",{
    userInfo: req.userInfo,
  })
}

//接受添加分类
exports.add = function(req,res){
  //获取提交分类
  let category = req.body.category

  //从数据库中查询是否添加分类
  if(category==''){
    res.render('admin/error',{
      userInfo: req.userInfo,
      optionMessage:{
        location:'分类首页',
        option:'分类添加',
        message:'分类名称不能为空'
      }
    })
  }

  Category.findOne({
    name: category,
  }).then((result)=>{
    if(result){
      //如果存在该分类
      res.render('admin/error',{
        userInfo: req.userInfo,
        optionMessage:{
          location:'分类首页',
          option:'分类添加',
          message:'该分类已存在.不能重复添加'
        }
      })
      return
    }

    new Category({ //保存到分类
      name: category
    }).save().then(()=>{
      res.render('admin/success',{  //渲染
        userInfo: req.userInfo,
        optionMessage:{
          location:'分类首页',
          option:'分类添加',
          message:'已成功添加该分类',
          href:'返回分类首页'
        },
        url:'/admin/category'
      })
    })
  })
}