$(function() {
    // 调用getUserinfo获取用户基本信息
    getUserInfo()


    var layer = layui.layer
        // 3给退出按钮点击绑定事件
    $('#btnLogout').on('click', function() {
        // 提示用户是否退出
        layer.confirm('确定退出登陆?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
                // 2.重新跳转到登陆页面
            location.href = '../login.html'

            // 关闭confirm询问框
            layer.close(index);
        });
    })
})


// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // 就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            if (res.status !== 0) return layui.layer.msg(res.message)
                // 调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)


        },
        // complete: function(res) {
        //     // console.log(res);
        //     // 在 complete 回调函数中, 可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.强制清空 token 
        //         localStorage.removeItem('token')
        //             // 2. 强制跳转到登陆页面
        //         location.href = '../login.html'
        //     }

        // }
    });
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username
        // 2. 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3. 渲染用户的头像
    if (user.user_pic != null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}