//配置模块
require.config({ 
    baseUrl:'https://cdnjs.cloudflare.com/ajax/libs/',//公有的路径
    paths:{
        'jquery':'jquery/1.12.4/jquery.min',  //引入jquery框架
        'jqcookie':'jquery-cookie/1.4.1/jquery.cookie.min',// 引入jqcookie插件
        'jqlazy':'jquery.lazyload/1.9.1/jquery.lazyload.min',//引入懒加载插件
    }
});