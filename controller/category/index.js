const Category = require('../../schema/category')
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
  Category.count().then((count)=>{
    //最大页数
    let pageMax = Math.ceil(count/limit)
    page = Math.min(pageMax,page)
    let skip = (page-1)*limit
    Category.find().limit(limit).skip(skip).sort({_id:-1}).then((results)=>{
      // console.log(results)
      res.render('admin/category/index',{
        userInfo:req.userInfo,
        results,
        page,
        pageMax
      })
    })
  })
}
//populate() 移植函数 按照指定字段ref进行跨集合查询