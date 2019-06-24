const Category = require('../../schema/category')


//更新修改
exports.showUpdate = function(req,res){
  let category = req.query.category;
  res.render("admin/category/update",{
    userInfo: req.userInfo,
    category,
  })
}
//接受修改
exports.update =function(req,res){
  //当前分类
  let cate = req.query.category

  //表单提交
  let category = req.body.category

  //如果分类为空
  if(category==''){
    res.render('admin/error',{
      userInfo: req.userInfo,
      optionMessage:{
        location:'分类首页',
        option:'分类修改',
        message:'分类名称不能为空'
      }
    })
    return
  }

  //从数据库查询

  Category.updateOne({name:cate},{$set:{name:category}}).then((result)=>{
    if(!result.nModified){ //如果改变数量为0
      res.render('admin/error',{
        userInfo: req.userInfo,
        optionMessage:{
          location:'分类首页',
          option:'分类修改',
          message:'当前分类已存在不可重复添加'
        }
      })
      return
    }
    res.render('admin/success',{
      userInfo: req.userInfo,
      optionMessage:{
        location:'分类首页',
        option:'分类修改',
        message:'分类修改成功',
        href:'返回分类首页'
      },
      url:'/admin/category'
    })

  })
}