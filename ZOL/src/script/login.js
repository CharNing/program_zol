require(['config'], function () {
    require(['jquery', 'jqcookie'], function () {
        login();
    })
})


function login() {
    const $phoneNum = $('#tel');
    const $password = $('#password');
    const $tip = $('#login-wrong-tips');
    const $loginBtn = $('.login-content .btn-login');

    // 获得焦点，输入框变红
    $phoneNum.on('focus', function () {
        $(this).parent('.item').css('border-color', '#CC0000');
    })
    // 失去焦点，输入框变灰
    $phoneNum.on('blur', function () {

        $(this).parent('.item').css('border-color', '#CCC')
    })

    $password.on('focus', function () {
        $(this).parent('.item').css('border-color', '#CC0000');
    })
    $password.on('blur', function () {

        $(this).parent('.item').css('border-color', '#CCC')
    })
    // 点击登录，进行匹配手机号与密码
    $loginBtn.on('click', function () {
        if ($phoneNum.val() !== '' && $password.val() !== '') {
            $.ajax({
                type: 'POST',
                url: 'http://10.31.155.61/program_zol/ZOL/php/login.php',
                data: {
                    tel: $phoneNum.val(),
                    password: $password.val()
                }
            }).done(function (isExist) {
                if (isExist) {
                    $.cookie('telphone',$phoneNum.val(),{expires: 30});
                    location.href = 'http://10.31.155.61/program_zol/ZOL/dist/zol.html';
                } else {
                    $tip.css('display', 'block').html('登录失败，用户名或密码错误');
                }
            })
        } else {
            if ($phoneNum.val() === '') {
                $tip.css('display', 'block').html('请填写手机号');
            } else if ($password.val() === '') {
                $tip.css('display', 'block').html('请填写密码');
            } else {
                $tip.css('display', 'block').html('请填写手机号');
            }
        }

    })



}