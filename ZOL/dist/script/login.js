"use strict";function login(){var t=$("#tel"),o=$("#password"),l=$("#login-wrong-tips"),n=$(".login-content .btn-login");t.on("focus",function(){$(this).parent(".item").css("border-color","#CC0000")}),t.on("blur",function(){$(this).parent(".item").css("border-color","#CCC")}),o.on("focus",function(){$(this).parent(".item").css("border-color","#CC0000")}),o.on("blur",function(){$(this).parent(".item").css("border-color","#CCC")}),n.on("click",function(){""!==t.val()&&""!==o.val()?$.ajax({type:"POST",url:"http://10.31.155.61/program_zol/ZOL/php/login.php",data:{tel:t.val(),password:o.val()}}).done(function(o){o?($.cookie("telphone",t.val(),{expires:30}),location.href="http://10.31.155.61/program_zol/ZOL/dist/zol.html"):l.css("display","block").html("登录失败，用户名或密码错误")}):""===t.val()?l.css("display","block").html("请填写手机号"):""===o.val()?l.css("display","block").html("请填写密码"):l.css("display","block").html("请填写手机号")})}require(["config"],function(){require(["jquery","jqcookie"],function(){login()})});