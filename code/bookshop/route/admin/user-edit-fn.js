// 引入用户集合的构造函数
const { User } = require('../../model/user');
// 引入加密模块
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  try {
    // 对密码进行加密处理
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    req.body.password = password;

    // 将用户信息添加到数据库中
    await User.create(req.body);

    // 将页面重定向到用户列表页面
    res.redirect('/admin/user');
  } catch (error) {
    // 发生错误时处理错误
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};