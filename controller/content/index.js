const Content = require('../../schema/content')
exports.showIndex = function(req,res){
  //从数据库中读取所有分类的信息
  /**
   *  分页 limit限制数据 count 找到多少数据 skip
   *  一页显示 x条数据
   *
   */
  let page = +req.query.page || 1 //当前页数
  let limit = 2 //每页显示2条

  //从数据库中读取所有用户信息
  Content.count().then((count)=>{
    //最大页数
    let pageMax = Math.ceil(count/limit)
    page = Math.min(pageMax,page)
    let skip = (page-1)*limit
    Content.find().limit(limit).skip(skip).sort({_id:-1}).populate(['category','author']).then((results)=>{
      // console.log(results)
      res.render('admin/content/index',{
        userInfo:req.userInfo,
        results,
        page,
        pageMax
      })
    })
  })
}