$(function() {
    // 点击注册账号的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //点击登陆的连接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],

        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码的值
            // 还需要拿到密码框中的值
            // 然后进行一次等于判断
            // 如果判断不相等，则return一个提示消息
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '宝贝，两次密码不一致哦!'
            }
        }
    })


    // 监听注册表单的提交事件
    $("#form_reg"), on('submit', function(e) {
        // 组织表单的默认提交行为
        e.preventDefault()
            // 发起Ajax的POST请求
        $.ajax({
            type: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message) //
                }
                layer.msg('注册成功,请登陆')
            }
        })
    })
})