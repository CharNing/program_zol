require(['config'], function () {
    require(['jquery'], function () {
        detailrender();
    })
});

function detailrender() {
    let sid = location.search.substring(1).split('=')[1]; // 获取地址栏里的sid
    const $showBox = $('.ulist .showBox'); // 展示栏外框
    const $title = $('.infor .inf-title');// 标题
    const $subhead = $('.infor .inf-title .subhead')// 副标题
    const $newprice = $('.price .new i'); // 最新价格
    const $oldprice = $('.price .old');// 旧价格
    const $save = $('.price .save');// 节省多少钱
    const $shop = $('.supplier p a'); //商家名
    const $smallpic = $('.small');// 小图
    const $bigpic = $('.big');// 大图
    // const $bigbox = $('.bf');


    const phpurl = 'http://10.31.155.61/program_zol/ZOL/php/';
    $.ajax({
        type: 'get',
        url: phpurl + 'details.php',
        dataType: 'json',
        data: {
            id: sid,
        }
    }).done(function (data) {
        // 渲染网页标题
        $('title').html(data.headline);

        // 小图和大图渲染
        $smallpic.attr('src',data.url);
        $bigpic.attr('src',data.url);
        
        //  渲染展示的小图列表
        let dataArr = data.urls.split(',');//将对条数据转化为数组
        let showhtml = '';
        $.each(dataArr, function (index, value) {
            if (index === 0) {
                showhtml += `
                <li class='show'>
                    <img src="${value}" alt="${data.headline}">
                </li>
                `
            } else if (index < 5) {
                showhtml += `
                <li>
                    <img src="${value}" alt="${data.headline}">
                </li>
                `
            }
        })
        $showBox.html(showhtml);

        // 渲染标题
        $title.prepend(data.headline);
        //渲染副标题
        $subhead.html(data.subhead);
        // 渲染价格
        $newprice.html(data.newprice + '.00');
        $oldprice.html('￥' + data.oldprice + '.00');
        let discount = data.oldprice - data.newprice;
        $save.html('立省' + discount);
        //商家名
        $shop.html(data.store);

        





    })
}