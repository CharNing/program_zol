"use strict";function detailrender(){var e=location.search.substring(1).split("=")[1],l=$(".ulist .showBox"),r=$(".infor .inf-title"),a=$(".infor .inf-title .subhead"),p=$(".price .new i"),s=$(".price .old"),o=$(".price .save"),c=$(".supplier p a");$.ajax({type:"get",url:"http://10.31.155.61/program_zol/ZOL/php/details.php",dataType:"json",data:{id:e}}).done(function(n){$("title").html(n.headline);var e=n.urls.split(","),t="";$.each(e,function(e,i){0===e?t+="\n                <li class='show'>\n                    <img src=\""+i+'" alt="'+n.headline+'">\n                </li>\n                ':e<5&&(t+='\n                <li>\n                    <img src="'+i+'" alt="'+n.headline+'">\n                </li>\n                ')}),l.html(t),r.prepend(n.headline),a.html(n.subhead),p.html(n.newprice+".00"),s.html("￥"+n.oldprice+".00");var i=n.oldprice-n.newprice;o.html("立省"+i),c.html(n.store)})}require(["config"],function(){require(["jquery"],function(){detailrender()})});