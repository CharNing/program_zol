"use strict";function isLogin(){var i=$(".logon"),o=$(".user"),e=$(".quit");$.cookie("telphone")?(i.show(),o.html($.cookie("telphone")),e.hide()):(i.hide(),e.show()),i.find(".exit").on("click",function(){$.cookie("telphone",0,{expires:-1}),i.hide(),e.show()})}require(["config"],function(){require(["jquery","jqcookie"],function(){isLogin()})});