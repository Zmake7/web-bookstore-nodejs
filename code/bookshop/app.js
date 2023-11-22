//引用框架
const express = require('express');
//处理路径
const path = require('path');

// 引入body-parser模块 用来处理post请求参数
const bodyPaser = require('body-parser');
//导入express-session模块
const session = require('express-session');
//创建网站服务器
const app = express();

//数据库连接
require('./model/connect');
//测试
// require('./model/user');

// 处理post请求参数
app.use(bodyPaser.urlencoded({extended: false}));
//配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized:false,
    cookie:{
        maxAge:24*60*60*1000
    }
}));//第二个参数是在没有登录时不产生空cookie

//渲染模板所需配置
//告诉express框架，模板所在位置
app.set('views', path.join(__dirname, 'views'));
//告诉框架，模板默认后缀
app.set('view engine', 'art');
//当渲染后缀为art的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
//渲染结束

//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')));

// 登录拦截请求 判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));
// app.use('/admin',(req, res, next)=>{
//     //如果用户不是登录的，将请求重定向到登陆页面
//     if(req.url != '/login'&& !req.ression.username){
//         res.redirect('/admin/login');
//     }else{
//         //用户是登陆状态，将请求放行
//         next();
//     }
// });

//引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');
//为路由匹配请求路径
app.use('/home',home);
app.use('/admin',admin);

//监听端口
app.listen(80);
console.log('success! please visit the bookstore:http://localhost/admin/login')