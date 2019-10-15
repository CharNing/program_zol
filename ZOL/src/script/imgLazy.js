require(['config'],function(){
    require(['jquery','jqlazy'],function(){
        $(function () {
            $("img.lazy").lazyload({
                effect: "fadeIn"
            });
        });
    })
})