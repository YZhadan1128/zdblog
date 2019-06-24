const Content = require('../../schema/content')
const Category = require('../../schema/category')


exports.showAdd = function(req,res){

  //从数据库中获取所有分类信息
  Category.find().then((results)=>{
    res.render('admin/content/add',{
      userInfo: req.userInfo,
      results
    })
  })
  // console.log(req)

}

//接受
exports.add = function(req,res){

  let {category,title,description,content} = req.body
  //从数据库中获取所有分类信息

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
        message:'描述不能为空o~'
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

  //在数据库中查询重复标题

  Content.findOne({title}).then((result)=>{
    if(result){     //如果找到了该标题
      res.render('admin/error',{
        userInfo:req.userInfo,
        optionMessage:{
          location:'内容首页',
          option:'内容添加',
          message:'该标题已存在,不能添加重复标题'
        }
      })
      return;
    }

    new Content({
      title,
      category,
      description,
      content,
      author:req.userInfo.id
    }).save().then((a)=>{
      console.log(a);
      res.render('admin/success',{
        userInfo:req.userInfo,
        optionMessage:{
          location:'内容首页',
          option:'内容添加',
          message:'这个文章已成功添加',
          href:'返回内容列表'
        },
        url:'/admin/content'
      })
    })
  })

}