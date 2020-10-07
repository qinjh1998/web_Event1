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
        // 从layui中获取 layui对象
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
    $("#form_reg").on('submit', function(e) {
        // 组织表单的默认提交行为
        e.preventDefault()
            // 发起Ajax的POST请求
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('注册成功,请登陆')
                    // 模拟人的点击行为 登陆成功后自动点击登陆跳转到登陆界面
                $('#link_login').click()
            }
        })
    })

    // 发起ajax登陆表单请求 
    // 监听登陆表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 发起ajax请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')

                }
                layer.msg('登陆成功！')
                    // 将登陆成功得到的 token 字符串,保存到localStorage中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '../../index.html'
            }
        })
    })






})