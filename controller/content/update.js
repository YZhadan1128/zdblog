
const Content = require('../../schema/content')


//展示修改内容页面
exports.showUpdate = function(req,res){
  let id = req.query.id;

  Content.findById(id).populate('category').then((result)=>{
    res.render('admin/content/update',{
      userInfo: req.userInfo ,
      result,
    })
  })

}

exports.update = function(req,res){

  //获取当前内容id
  let id = req.query.id;
  let {title,description,content} = req.body

  if(title==""){
    res.render('admin/error',{
      userInfo: req.userInfo,
      optionMessage:{
        location:'内容首页',
        option:'内容添加',
        message:'标题不能为空o~'
      }
    })
    return
  }
  if(description==""){
    res.render('admin/error',{
      userInfo: req.userInfo,
      optionMessage:{
        location:'内容首页',
        option:'内容添加',
        message:'介绍描述不能为空o~'
      }
    })
    return
  }
  if(content==""){
    res.render('admin/error',{
      userInfo: req.userInfo,
      optionMessage:{
        location:'内容首页',
        option:'内容添加',
        message:'内容不能为空o~'
      }
    })
    return
  }


  //查询数据库
  Content.updateOne({_id:id},{$set:{
    title,description,content,
      time: new Date
  }}).then((result)=>{
    res.render('admin/success',{
      userInfo: req.userInfo,
      optionMessage:{
        location:'内容首页',
        option:'内容添加',
        message:'修改成功了~',
        href:'返回内容首页'
      },
      url:'/admin/content'
    })
  })
}