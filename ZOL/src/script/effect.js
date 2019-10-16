require(['config'], function () {
    require(['jquery'], function () {
        topnav();
        tab();
        floor();
        banner();
    //     $(function () {
    //         $("lazy").lazyload({
    //             effect: "fadeIn"
    //         });
    //     });
    })
});

// 顶部悬浮
function topnav() {
    const $topNav = $('#top-nav')
    $(window).on('scroll', function () {
        let $top = $(window).scrollTop();
        if ($top >= 98) {
            $topNav.show();
        } else {
            $topNav.hide();
        }
    })
}

// 楼梯效果
function floor() {
    const $floorNav = $('#floor-nav'); // 楼梯导航
    const $floorBtn = $('#floor-nav li').not('.last') // 楼梯按钮
    const $flo = $('.main-wrap .floor'); // 每个楼层
    const $backTop = $('#floor-nav .last');

    // 页面刷新后，页面的scrollTop值，是否大于150
    let $curtop = $(window).scrollTop();
    if ($curtop >= 300) {
        $floorNav.show();
    } else {
        $floorNav.hide();
    }

    // window滚动条，滚动时变化
    $(window).on('scroll', function () {
        // 显示楼梯导航
        let $curtop = $(window).scrollTop();
        if ($curtop >= 300) {
            $floorNav.show();
        } else {
            $floorNav.hide();
        }

        // 滚动条位置对应的导航按钮
        $flo.each(function (index, element) {
            let $floorTop = $flo.eq(index).offset().top + $(element).height() / 2.5;
            if ($floorTop >= $curtop) {
                $floorBtn.removeClass('active');
                $floorBtn.eq(index).addClass('active');
                return false;
            }
        })
    })

    // 点击楼层按钮到相对应的楼层
    $floorBtn.on('click', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        let $floorTop = $flo.eq($(this).index()).offset().top - 50;
        $('html,body').animate({
            scrollTop: $floorTop
        })
    })

    // 回到顶部
    $backTop.on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        })
    })
}

// tab 切换
function tab() {
    const $tabBtn = $('.tag-title h4');
    const $tabContent = $('.content-box .refresh');
    var timer = null;
    $tabBtn.hover(
        function () {
            const _this = $(this)
            clearTimeout(timer);
            timer = setTimeout(function () {
                _this.addClass('active').siblings($tabBtn).removeClass('active');
                $tabContent.eq(_this.index()).addClass('show').siblings($tabContent).removeClass('show');
            }, 300)
        }),
        function () {
            clearTimeout(timer);
        }
}

// 轮播图

function banner() {
    const $btn = $('#banner ol li');
    const $picbox = $('#banner .banpic');
    const $pic = $('#banner .banpic li');
    const $left = $('#left');
    const $right = $('#right');

    // 设置banner外框的长度
    let $picWidth = $pic.width();
    $picbox.width($picWidth * $pic.length);
    let curIndex = 0;

    // 移到哪个按钮，移到哪张图
    $btn.on('mouseover', function () {
        curIndex = $(this).index()
        $(this).addClass('active').siblings('li').removeClass('active');
        $picbox.stop(true).animate({
            left: -$picWidth * ($(this).index())
        })
    })

    // 点击右边箭头，图片移动
    $right.on('click', function () {
        rightmove();
    })

    // 点击左边箭头，图片移动
    $left.on('click', function () {
        curIndex--;
        if (curIndex < 0) {
            curIndex = $btn.length - 1;
            $picbox.stop(true).animate({
                left: -$picWidth * curIndex,
            })
            $btn.eq(curIndex).addClass('active').siblings('li').removeClass('active');
        } else {
            $picbox.stop(true).animate({
                left: -$picWidth * curIndex,
            })
            $btn.eq(curIndex).addClass('active').siblings('li').removeClass('active');
        }
    })

    // 自动播放
    let timer = null;
    timer = setInterval(function () {
        rightmove();
    }, 2000)

    // 移入banner框，停止自动播放，移除恢复播放
    $picbox.hover(
        function () {
            clearInterval(timer);
        },
        function () {
            timer = setInterval(function () {
                rightmove();
            },2000)
        })

    // 封装向右移动函数
    function rightmove() {
        curIndex++;
        if (curIndex < $btn.length) {
            $picbox.stop(true).animate({
                left: -$picWidth * curIndex,
            })
            $btn.eq(curIndex).addClass('active').siblings('li').removeClass('active');
        } else {
            curIndex = 0;
            $picbox.stop(true).animate({
                left: -$picWidth * curIndex,
            })
            $btn.eq(curIndex).addClass('active').siblings('li').removeClass('active');
        }
    }

}
