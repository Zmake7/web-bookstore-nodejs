//引用框架
const express = require('express');

//导入用户集合构造函数
const {User} = require('../model/user')
const bcrypt = require('bcrypt');
//创建书店管理页面路由
const admin = express.Router();

admin.get('/login',(req,res) => {
    res.render('admin/login')
});

//实现登录功能
admin.post('/login',async(req,res) => {
    //接受请求参数
    const {email,password} = req.body;
    //如果用户没有输入邮箱或密码
    if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error',{msg:'Wrong email address or password'});
    //根据邮箱地址查询用户信息
    //如果查询到了用户，user变量是对象类型，对象中储存的是用户信息
    //如果没查询到用户，user变量为空
    let user = await User.findOne({email});
    //查询到了用户
    if (user){
        //将客户端传输过来的密码和用户信息中的密码进行比对
        //ture 比对成功
        //false 比对失败
        let isValid = await bcrypt.compare(password,user.password);
        //如果比对成功
        if (isValid){
            //登陆成功
            //将用户名储存在请求对象中
            req.session.username = user.username;
            //res.send('login successful');
            //重定向到用户列表页面
            req.app.locals.userInfo = user;
            res.redirect('/admin/user');
        }else{
            //没有查询到用户
            res.status(400).render('admin/error',{msg:'Wrong email address or password'});
        }

    }else{
        //没有查询到
        res.status(400).render('admin/error',{msg:'Wrong email address or password'});
    }
    
});

//创建用户列表路由
// admin.get('/user',(req,res) => {
//     res.render('admin/user');
// });
admin.get('/user',require('./admin/userPage'));

//实现退出功能
admin.get('/logout',(req,res)=>{
    //删除session
    req.session.destroy(function(){
        //删除coolies
        res.clearCookie('connect.sid');
        //重定向到用户登录页面
        res.redirect('/admin/login');
    });
    
    
});

//创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'));

//创建实现用户添加功能路由
admin.post('/user-edit',require('./admin/user-edit-fn'));

admin.post('/user-modify',require('./admin/user-modify'));

//删除用户路由
admin.get('/delete',require('./admin/user-delete'));

//将路由对象作为模块成员进行导出
module.exports = admin;