$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码与旧密码不能一致哦！'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入密码不一致！'
            }
        }
    })



    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新密码成功！')
                    // 重置密码  reset是dom方法 jQueryform表单元素需要转换为dom对象[0]
                $('.layui-form')[0].reset()
            }
        });
    })





})