require(['config'], function () {
    require(['jquery','jqcookie'], function () {
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
    const $agree = $('.agree .chose'); // 阅读协议复选框
    const $btn = $('#registry-form')// 提交按钮
    let passlock = true;
    let tellock = true;
    let paswdlock = true;
    let codelock = true;
    let agreelock = true;
    code($code); // 生成验证码

    // 手机号码验证
    $phone.on('focus', function () {
        $(this).css('border-color', '#CC0000')
    })
    $phone.on('blur', function () {
        let reg = /^1[3456789]\d{9}$/;
        if ($(this).val() !== '') {
            if (reg.test($(this).val())) {
                $.ajax({
                    type:'post',
                    url:'http://10.31.155.61/program_zol/ZOL/php/registry.php',
                    data:{
                        userphone:$phone.val()
                    }
                }).done(function(isExist){
                    if(!isExist){
                        $wrophone.css({
                            'background-position-y': '-148px',
                            'display': 'block'
                        })
                            .html('');
                        tellock = true;
                    }else{
                        $wrophone.css({
                            'background-position-y': '-184px',
                            'display': 'block',
                        }).html('手机号已注册');
                        tellock = false;
                    }
                })
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
        $wrocode.css({
            'display': 'none'
        }).html('');
    })
    // 验证验证码
    $incode.on('focus', function () {
        $(this).css('border-color', '#c00000');
    })
    $incode.on('blur', function () {
        if ($(this).val() !== '') {
            if($code.html() === $incode.val()){
                $wrocode.css({
                    'background-position-y': '-148px',
                    'display': 'block'
                }).html('');
                codelock = true;
            }else{
                $wrocode.css({
                    'background-position-y': '-184px',
                    'display': 'block'
                })
                    .html('验证码错误，请重新输入');
                codelock = false;
            }
        } else {
            $wrocode.css({
                'background-position-y': '-184px',
                'display': 'block'
            })
                .html('请填写验证码');
            codelock = false;
        }
        $(this).css('border-color', '#CCC');
    })

    // 设置密码
    $password.on('focus', function () {
        $(this).css('border-color', '#c00000');
    })
    
    $password.on('blur', function () {
        let regNum = /^[0-9]+$/g;
        if ($(this).val() !== '') {
            if ($(this).val().length >= 6 && $(this).val().length <= 16) {
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
    })

    // 确认密码
    $repass.on('focus', function () {
        $(this).css('border-color', '#c00000');
    })
    $repass.on('blur', function () {
        if ($(this).val() !== '') {
            if ($(this).val() === $password.val()) {
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

    // 用户协议是否打钩
    $agree.on('click',function(){
        if($agree.prop('checked')){
            agreelock =true;
        }else{
            agreelock=false;
        }
    })

    // 点击提交
    $btn.on('submit',function(){
        // 判断手机号码是否为空
        if($phone.val()===''){
            $wrophone.css({
                'background-position-y': '-184px',
                'display': 'block'
            })
                .html('手机号码不能为空');
            tellock = false;
        }
        // 判断验证码是否为空
        if($incode.val()===''){
            $wrocode.css({
                'background-position-y': '-184px',
                'display': 'block'
            })
                .html('请填写验证码');
            codelock = false;
        }
        // 判断密码是否为空
        if($password.val()===''){
            $wropass.css({
                'background-position-y': '-184px',
                'display': 'block',
                'color': '#ff3333'
            })
                .html('请填写密码');
            paswdlock = false;
        }
        //判断确认密码是否为空
        if($repass.val()===''){
            $wrorepeat.css({
                'background-position-y': '-184px',
                'display': 'block',
                'color': '#ff3333'
            })
                .html('请填写确认密码');
            paswdlock = false;
        }

        //判断阅读协议是否打钩
        if(!agreelock){
            alert('请先阅读用户协议');
            return false;
        }else{
            if(!passlock || !tellock || !paswdlock || !codelock || !agreelock){
                return false;
            }
        }
        
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
