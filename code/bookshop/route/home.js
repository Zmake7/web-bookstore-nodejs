//引用框架
const express = require('express');
//创建书店展示页面路由
const home = express.Router();

home.get('/',(req,res) => {
    res.send('Welcome to the bookstore display page')
});

//将路由对象作为模块成员进行导出
module.exports = home;