require(['config'], function () {
    require(['jquery'], function () {
        registry();
        code();
    })
})

// 表单注册
function registry() {
    const $form = $('#registry-form');// 表单
    const $phone = $('#userphone'); // 手机号码
    const $code = $('#code') // 验证码
    const $password = $('#password');//密码
    const $repass = $('#repeat');// 确认密码 
    const $wrophone = $('#registry-form .wrophone'); // 手机错误提示
    const $wrocode = $('#registry-form .wrocode'); // 验证码错误提示
    const $wropass = $('#registry-form .wropass');// 密码错误提示
    const $wrorepeat = $('#registry-form .wrorepeat');// 再次确认密码错误提示
    const $btn = $('#registry-form .submit-btn')// 提交按钮
    let passlock = true;
    let tellock = true;

    // 手机号码验证
    $phone.on('focus', function () {
        $(this).css('border-color', '#CC0000')
    })

    $phone.on('blur', function () {
        let reg = /^1[3456789]\d{9}$/;
        if ($(this)[0].value !== '') {
            if (reg.test($(this)[0].value)) {
                $wrophone.css('display', 'none');
                tellock = true;
            } else {
                $wrophone.css('display', 'block').html('请填写有效的11位手机号码');
                tellock = false;
            }
        } else {
            $wrophone.css('display', 'block').html('手机号码不能为空');
            tellock = false;
        }
        $(this).css('border-color', '#CCC');
    })

    // 验证码验证

}
// 生成验证码
function code() {
    const $code = $('#code');
    let arr = [];
    for (let i = 48; i <= 57; i++) {
        arr.push(String.fromCharCode(i));
    }

    for (let i = 97; i <= 122; i++) {
        arr.push(String.fromCharCode(i));
    }
    $code.on('click', function () {
        let codehtml = '';
        for (let i = 1; i <= 6; i++) {
            let index = random(0, arr.length - 1);
            if (index > 9) {
                let bstop = Math.random() > 0.5 ? true : false;
                if (bstop) {
                    codehtml += arr[index].toUpperCase();
                } else {
                    codehtml += arr[index];
                }
            } else {
                codehtml += arr[index];
            }
        }

        $(this).html(codehtml);
    })

    // 随机数
    function random(min, max) {
        return parseInt(Math.random() * (max - min + 1)) + min;
    }

}