//本文档连接数据库

// 引入mongoose第三方模块
const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
    .then(() => {
    console.log('数据库连接成功');
    })
    .catch(error => {
    console.log('数据库连接失败：', error);
    });
