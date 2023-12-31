// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 导入bcrypt
const bcrypt = require('bcrypt');
// 创建用户集合规则
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,//必须创建
		minlength: 2,
		maxlength: 20
	},
	email: {
		type: String,
		// 保证邮箱地址在插入数据库时不重复
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	// admin 超级管理员
	// normal 普通用户
	role: {
		type: String,
		required: true
	},
	// 0 启用状态
	// 1 禁用状态
	state: {
		type: Number,
		default: 0
	}
});

// 创建集合
const User = mongoose.model('User', userSchema);

async function createUser () {
	const salt = await bcrypt.genSalt(10);
	const pass = await bcrypt.hash('123456', salt);
	const user = await User.create({
		username: 'zhou tiancheng',
		email: 'tianchzhou@yandex.com',
		password: pass,
		role: 'admin',
		state: 0
	});
}

//createUser();
//测试
//如果不注释掉，每次运行都创建一个，因为一样会报错
// User.create({
//     username: 'zhou tiancheng',
//  	email: 'tianchzhou@yandex.com',
//  	password: '123456',
// 	role: 'admin',
// 	state: 0
// }).then(()=>{
//     console.log('用户创建成功')
// }).catch(()=>{
//     console.log('用户创建失败')
// })

//将用户集合作为模块成员进行导出
module.exports = {
    User
}

