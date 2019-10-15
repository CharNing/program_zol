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
    const $incode = $('#incode');// 验证码输入框
    const $code = $('#code') // 验证码
    const $password = $('#password');//密码
    const $repass = $('#repeat');// 确认密码 
    const $wrophone = $('#registry-form .wrophone'); // 手机错误提示
    const $wrocode = $('#registry-form .wrocode'); // 验证码错误提示
    const $wropass = $('#registry-form .wropass');// 密码错误提示
    const $wrorepeat = $('#registry-form .wrorepeat');// 再次确认密码错误提示
    const $btn = $('#registry-form .submit-btn')// 提交按钮
    let passText = null;
    let passlock = true;
    let tellock = true;
    let paswdlock = true;

    // 手机号码验证
    $phone.on('focus', function () {
        $(this).css('border-color', '#CC0000')
    })

    $phone.on('blur', function () {
        let reg = /^1[3456789]\d{9}$/;
        if ($(this)[0].value !== '') {
            if (reg.test($(this)[0].value)) {
                $wrophone.css({
                    'background-position-y': '-148px',
                    'display': 'block'
                })
                    .html('');
                tellock = true;
            } else {
                $wrophone.css('display', 'block').html('请填写有效的11位手机号码');
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

    // 验证码验证
    // $incode.on('focus', function () {
    //     $(this).css('border-color', '#c00000');
    // })
    // $incode.on('blur', function () {
    //     if ($(this)[0].value !== '') {
    //         console.log(1);
    //     } else {
    //         console.log(2);
    //     }
    // })

    // 密码验证
    $password.on('focus', function () {
        $(this).css('border-color', '#c00000');
    })

    $password.on('blur', function () {
        let regNum = /[0-9]+/g;
        let regUpper = /[A-Z]+/g;
        let regLower = /[a-z]+/g;
        let other = /[\W\_]+/g;
        let count = 0;

        if ($(this)[0].value !== '') {
            if ($(this)[0].value.length >= 6 && $(this)[0].value.length <= 16) {
                if (regNum.test($(this)[0].value)) {
                    count++;
                }
                if (regUpper.test($(this)[0].value)) {
                    count++;
                }
                if (regLower.test($(this)[0].value)) {
                    count++;
                }
                if (other.test($(this)[0].value)) {
                    count++;
                }

                switch (count) {
                    case 1: {
                        $wropass.css({
                            'background-position-y': '-184px',
                            'display': 'block'
                        })
                            .html('密码不能全是数字');
                        paswdlock = false;
                    }; break;
                    case 2:
                    case 3: {
                        $wropass.css({
                            'background-position-y': '-148px',
                            'display': 'block',
                            'color': 'orange'
                        })
                            .html('中');
                        paswdlock = true;
                    }; break;
                    case 4: {
                        $wropass.css({
                            'background-position-y': '-148px',
                            'display': 'block',
                            'color': 'green'
                        })
                            .html('强');
                        paswdlock = true;
                    }
                }
            } else {
                $wropass.css({
                    'background-position-y': '-184px',
                    'display': 'block',
                    'color': '#ff3333'
                })
                    .html('6-16位字符，可使用字母、数字或符号的组合');
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
        console.log(passText)
    })

    // 密码匹配
    console.log(passText)
    $repass.on('focus', function () {
        $(this).css('border-color', '#c00000');
    })
    $repass.on('blur',function(){

    })




}


    // 包装生成验证码函数
    function code() {
        const $code = $('#code');
        let codeText = null;
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
    }
    // 包装随机数函数
    function random(min, max) {
        return parseInt(Math.random() * (max - min + 1)) + min;
    }