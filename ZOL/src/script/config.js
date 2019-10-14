//配置模块
require.config({ 
    baseUrl:'https://cdnjs.cloudflare.com/ajax/libs/',//公有的路径
    paths:{
        'jquery':'jquery/1.12.4/jquery.min',  //引入jquery框架
        'jqcookie':'jquery-cookie/1.4.1/jquery.cookie.min',// 引入jqcookie插件
        'require':'require.js/2.3.6/require.min.js'// 引入require.js插件
    }
});