require(['config'],function(){
    require(['jquery','jqcookie'],function(){
        isLogin();
    })
})

    
function isLogin(){
    const $loginState = $('.logon'); //登录后的状态
    const $user = $('.user');
    const $quitState = $('.quit');//退出后的状态
    //判断cookie是否存在用户
    if($.cookie('telphone')){
        $loginState.css('display','block');
        $user.html($.cookie('telphone'));
        $quitState.css('display','none');
    }else{
        $loginState.css('display','none');
        $quitState.css('display','block');
    }

    // 点击退出
    $loginState.find('.exit').on('click',function(){
        $.cookie('telphone',0,{expires:-1});
        $loginState.css('display','none');
        $quitState.css('display','block');


    })
}