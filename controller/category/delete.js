const Category = require('../../schema/category')


exports.showDelete = function(req,res){
  let category = req.query.category
  res.render("admin/category/delete",{
    userInfo: req.userInfo,
    category,
  })
}

exports.delete = function(req,res){
  let category = req.body.category

  if(category==''){
    res.render('admin/error',{
      userInfo: req.userInfo,
      optionMessage:{
        location:'分类首页',
        option:'分类删除',
        message:'分类名称不能为空'
      }
    })
    return
  }

  //从数据库中查询

  Category.deleteOne({
    name: category
  }).then((result)=>{
    if(!result.deletedCount){ //如果删除数量是0
      res.render('admin/error',{
        userInfo: req.userInfo,
        optionMessage:{
          location:'分类首页',
          option:'分类删除',
          message:'不能删除'
        }
      })
      return
    }
    res.render('admin/success',{
      userInfo: req.userInfo,
      optionMessage:{
        location:'分类首页',
        option:'分类删除',
        message:'成功删除',
        href:'返回分类首页'
      },
      url:'/admin/category'
    })
  })

}