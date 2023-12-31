//为了根据id引入用户信息，引入user集合构造函数
const { User } = require('../../model/user');

module.exports = async (req, res) => {
	// 获取到地址栏中的id参数
	const { message, id } = req.query;

	// 如果当前传递了id参数
	if (id) {
		// 修改操作
		let user = await User.findOne({_id: id});

		// 渲染用户编辑页面(修改)
		res.render('admin/user-edit', {
			message: message,
			user: user,
			link: '/admin/user-modify?id=' + id,//提交到修改用户界面
			button: 'Change'
		});

	}else {
		// 添加操作
		res.render('admin/user-edit', {
			message: message,
			link: '/admin/user-edit',//回到原界面
			button: 'Add'
		});
	}

	
}