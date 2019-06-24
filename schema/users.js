const mongoose = require('mongoose')

//设置用户数据格式
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin:{
    type: Boolean,
    default: false
  }

})
//暴露用户model
module.exports = mongoose.model('users',userSchema)