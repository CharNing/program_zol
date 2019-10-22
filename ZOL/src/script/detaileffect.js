require(['config'], function () {
    require(['jquery', 'jqcookie'], function () {
        fdj();
        show();
        car();
    })
})
// 放大镜效果
function fdj() {
    const $picbox = $('.picbox');//小图外框
    const $smallpic = $('.picbox .small'); // 小图
    const $sf = $('.picbox .sf'); //小放大镜
    const $bigpic = $('.bf .big'); // 大图
    const $bf = $('.bf'); // 大放大镜

    // 小放大镜的宽高
    const sfWidth = $smallpic.width() * $bf.width() / $bigpic.width();
    const sfHeight = $smallpic.height() * $bf.height() / $bigpic.height();
    // 缩放比例
    const bili = $bigpic.width() / $smallpic.width();

    $picbox.hover(
        function () {
            $sf.css({
                'visibility': 'visible',
                'width': sfWidth,
                'height': sfHeight,
            });
            $bf.css({
                'visibility': 'visible',
            });

            $(document).on('mousemove', function (eve) {
                let shortleft = eve.pageX - $picbox.offset().left - $sf.width() / 2;
                let shorttop = eve.pageY - $picbox.offset().top - $sf.height() / 2;
                if (shortleft <= 0) {
                    shortleft = 0;
                } else if (shortleft >= $picbox.width() - $sf.width()) {
                    shortleft = $picbox.width() - $sf.width();
                }

                if (shorttop <= 0) {
                    shorttop = 0;
                } else if (shorttop >= $picbox.height() - $sf.height()) {
                    shorttop = $picbox.height() - $sf.height();
                }
                $sf.css({
                    'left': shortleft,
                    'top': shorttop,
                });
                $bigpic.css({
                    'left': -shortleft * bili,
                    'top': -shorttop * bili
                })

            })
        },
        function () {
            $sf.css({
                'visibility': 'hidden',
            })
            $bf.css({
                'visibility': 'hidden',
            })
        })
}

// 点击展示图，小图切换
function show() {
    const $smallpic = $('.picbox .small');
    const $bigpic = $('.bf .big');
    const $showBox = $('.ulist .showBox');// 展示列表的图片
    $showBox.delegate('li', 'click', function (ev) {
        console.log(ev.target.nodeName)
        if (ev.target.nodeName === 'IMG') {
            $(this).addClass('show').siblings('li').removeClass('show')
            let newUrl = $(this).find('img').attr('src');
            $smallpic.attr('src', newUrl);
            $bigpic.attr('src', newUrl);
        }

    })

}
// 加入购物车
function car() {
    let sid = location.search.substring(1).split('=')[1]; //获取地址栏里的sid
    let $buyNum = $('.quantity .goods-num');// 购买数量
    const $carbtn = $('.deal-btn .add-car');// 加入购物车按钮
    const $addbtn = $('.amount .increase');// 增加按钮
    const $reducebtn = $('.amount .decrease')// 减少按钮
    const $limit = $('.quantity .limit');// 限购数量
    let arrsid = [];// 放置sid
    let arrnum = [];// 放置商品数量

    
    // 判断是否存在商品的sid和数量
    if ($.cookie('goodsid') && $.cookie('goodsnum')) {
        arrsid = $.cookie('goodsid').split(',');
        arrnum = $.cookie('goodsnum').split(',');
    }

    // 点击增加按钮,数量增加
    $addbtn.on('click', function () {
        let num = $buyNum.val();
        num++;
        if (num < $limit.html()) {
            $buyNum.val(num)
        } else {
            $buyNum.val(99)
        }
    })

    // 点击减少按钮,数量减少
    $reducebtn.on('click', function () {
        let num = $buyNum.val();
        num--;
        if (num > 1) {
            $buyNum.val(num);
        } else {
            $buyNum.val(1);
        }
    })


    // 点击加入购物车
    $carbtn.on('click', function () {
        if (arrsid.indexOf(sid) !== -1) {//表示已存在此商品
            let index = arrsid.indexOf(sid);
            arrnum[index] = parseInt(arrnum[index]) + parseInt($buyNum.val());
            if (arrnum[index] < $limit.html()) { // 判断添加的数量是否超过限购数量
                $.cookie('goodsnum', arrnum.toString(), { expires: 30 });
            }else{
                alert('超过限购数量');
            }

        } else {// 不存在此商品，第一次添加
            arrsid.push(sid);
            arrnum.push($buyNum.val());
            $.cookie('goodsid', arrsid.toString(), { expires: 30 });
            $.cookie('goodsnum', arrnum.toString(), { expires: 30 });
        }
        alert('商品添加成功');
    })






}