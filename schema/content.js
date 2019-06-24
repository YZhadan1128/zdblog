const mongoose = require('mongoose');

//定义分类的数据格式
const contentSchema = new mongoose.Schema({
  //分类的名字

  title:String,
  description: String,
  content: String,
  //内容分类
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'categorys'
  },
  //作者
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
  },
  //阅读量
  views:{
    type: Number,
    default: 0
  },
  //评论数
  comment:{
    type: Array,
    dafault:[]
  },
  //发布时间
  time:{
    type: Date,
    default: new Date()
  },


})

//暴露分类的模型
module.exports = mongoose.model('contents',contentSchema);