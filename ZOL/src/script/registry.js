require(['config'], function () {
    require(['jquery'], function () {
        registry();
        
    })
})

// 表单注册
function registry() {
    const $form = $('#registry-form');// 表单
    const $phone = $('#userphone'); // 手机号码
    const $incode = $('#incode');// 验证码输入框
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
    let paswdlock = true;
    let codelock = true;
    code($code);

    // 手机号码验证
    $phone.on('focus', function () {
        $(this).css('border-color', '#CC0000')
    })

    $phone.on('blur', function () {
        let reg = /^1[3456789]\d{9}$/;
        if ($(this)[0].value !== '') {
            if (reg.test($(this).val())) {
                $wrophone.css({
                    'background-position-y': '-148px',
                    'display': 'block'
                })
                    .html('');
                tellock = true;
            } else {
                $wrophone.css({
                    'background-position-y': '-184px',
                    'display': 'block',
                }).html('请填写有效的11位手机号码');
                tellock = false;
            }
        } else {
            $wrophone.css({
                'background-position-y': '-184px',
                'display': 'block'
            })
                .html('手机号码不能为空');
            tellock = false;
        }
        $(this).css('border-color', '#CCC');
    })

    
    // 点击刷新验证码
    $code.on('click',function(){
        code($(this));
    })
    // 验证验证码
    $incode.on('focus', function () {
        $(this).css('border-color', '#c00000');
    })
    $incode.on('blur', function () {
        if ($(this)[0].value !== '') {

        } else {

        }
        $(this).css('border-color', '#CCC');
    })

    // 设置密码
    $password.on('focus', function () {
        $(this).css('border-color', '#c00000');
    })

    $password.on('blur', function () {
        let regNum = /^[0-9]+$/g;
        if ($(this)[0].value !== '') {
            if ($(this)[0].value.length >= 6 && $(this)[0].value.length <= 16) {
                if (regNum.test($(this).val())) {
                    $wropass.css({
                        'background-position-y': '-184px',
                        'display': 'block',
                        'color': '#ff3333'
                    }).html('密码不能全是数字');
                    paswdlock = false;
                } else {
                    $wropass.css({
                        'background-position-y': '-148px',
                        'display': 'block',
                        'color': '#ff3333'
                    }).html('');
                    paswdlock = true;
                }
            } else {
                $wropass.css({
                    'background-position-y': '-184px',
                    'display': 'block',
                    'color': '#ff3333'
                }).html('6-16位字符，可使用字母、数字或符号的组合');
                paswdlock = false;
            }
        } else {
            $wropass.css({
                'background-position-y': '-184px',
                'display': 'block',
                'color': '#ff3333'
            })
                .html('请填写密码');
            paswdlock = false;
        }
        $(this).css('border-color', '#CCC');
        passText = $(this).val();
    })

    // 确认密码
    $repass.on('focus', function () {
        $(this).css('border-color', '#c00000');
    })
    $repass.on('blur', function () {
        if ($(this)[0].value !== '') {
            if ($(this).val() === passText) {
                $wrorepeat.css({
                    'background-position-y': '-148px',
                    'display': 'block',
                })
                    .html('');
                paswdlock = true;
            } else {
                $wrorepeat.css({
                    'background-position-y': '-184px',
                    'display': 'block',
                    'color': '#ff3333'
                })
                    .html('两次填写的密码不一致');
                paswdlock = false;
            }
        } else {
            $wrorepeat.css({
                'background-position-y': '-184px',
                'display': 'block',
                'color': '#ff3333'
            })
                .html('请填写确认密码');
            paswdlock = false;
        }
        $(this).css('border-color', '#CCC');
    })




}


// 包装生成验证码函数
function code(box) {
    let arr = [];
    for (let i = 48; i <= 57; i++) {
        arr.push(String.fromCharCode(i));
    }
    for (let i = 97; i <= 122; i++) {
        arr.push(String.fromCharCode(i));
    }
    let codehtml = '';
    for (let i = 1; i <= 6; i++) {
        let index = parseInt(Math.random() * (arr.length));
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
    box.html(codehtml);
}
