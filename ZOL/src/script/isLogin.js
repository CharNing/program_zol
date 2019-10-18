require(['config'],function(){
    require(['jquery','jqcookie'],function(){
        isLogin();
    })
})

// 登录模块
function isLogin(){
    const $loginState = $('.logon'); //登录后的状态
    const $user = $('.user');
    const $quitState = $('.quit');//退出后的状态
    //判断cookie是否存在用户
    if($.cookie('telphone')){
        $loginState.show();
        $user.html($.cookie('telphone'));
        $quitState.hide();
    }else{
        $loginState.hide();
        $quitState.show();
    }

    // 点击退出
    $loginState.find('.exit').on('click',function(){
        $.cookie('telphone',0,{expires:-1});
        $loginState.hide();
        $quitState.show();
    })
}