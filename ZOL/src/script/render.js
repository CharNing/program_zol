require(['config'], function () {
    require(['jquery','require'], function () {
        render();
    })
});

function render() {
    const $banpic = $('.banner .banpic');
    const $hotpic = $('#hot-pic');
    const $buypic = $('#buy-pic');
    const $hottgpic = $('.ad .middle-ad .item');
    const $cheap = $('#first');
    const $recommend = $('#second');
    const $goods = $('#third');
    const phpurl = 'http://10.31.155.61/program_zol/ZOL/php/';
    $.ajax({
        type: 'get',
        url: phpurl + 'goodslist.php',
        dataType: 'json',
    }).done(function (data) {
        console.log(data);
        let banhtml = '';
        let hothtml = '';
        let buyhtml = '';
        let hottghtml = '';
        let cheaphtml = '';
        let recommend = '';
        let goods = '';
        $.each(data, function (index, value) {
            if (value.title === 'banner') {// banner图渲染
                banhtml += `
            <li>
                <a href="#">
                    <img src="${value.url}" alt="">;
                </a>
            </li>
            `
            } else if (value.title === 'hot') { // 今日抢购渲染
                if (value.top) {
                    hothtml += `
                        <li>
                            <a href="#">
                            <img src="${value.url}" alt=""></a>
                            <a href="#">
                                <p>${value.headline}</p>
                            </a>
                            <div class="price">
                                <span>￥</span>${value.newprice}<span class="old">${value.oldprice}</span>
                            </div>
                            <i class='top-${value.top}'></i>
                        </li>
                    `
                } else {
                    hothtml += `
                        <li>
                            <a href="#"><img
                                    src="${value.url}" alt=""></a>
                            <a href="#">
                                <p>${value.headline}</p>
                            </a>
                            <div class="price">
                                <span>￥</span>${value.newprice}<span class="old">${value.oldprice}</span>
                            </div>
                        </li>
                    `
                }
            } else if (value.title === 'buy') { // 会买专辑渲染
                buyhtml += `
                <li>
                    <a href="#">
                    <img src="${value.url}" alt=""></a>
                    <a href="#">
                        <p>${value.headline}</p>
                    </a>
                </li>
                `
            } else if (value.title === 'hot-tg') { // 热门团购渲染
                hottghtml += `
                <li class="clear_fix">
                    <a href="#">
                        <img src="${value.url}"  alt="${value.headline}">
                        <span class="description"><i>${value.headline}</i></span>
                    </a>
                    <p class="ad-price">
                        ￥${value.newprice} <em>￥${value.oldprice}</em>
                    </p>
                </li>
                `
            } else if (value.title === 'cheap') { //精选好价
                if (value.text) {
                    cheaphtml += `
                    <div class="refresh-item">
                        <div class="refresh-pic">
                            <a href="#">
                                <img src="${value.url}" alt="">
                            </a>
                        </div>
                        <div class="refresh-info">
                            <a href="#">
                                ${value.headline}
                                <span>${value.subhead}</span>
                            </a>
                            <div >
                                <p class="content-text first-text">
                                    ${value.text}
                                </p>
                                <a href="#" class="more">查看详情</a>
                            </div>
                            <div class="clear_fix">
                                <p class="left">
                                    <span></span>
                                    天猫商城
                                </p>
                                <p class="right">
                                    <a class="btn-right" href="#">去看看&gt;</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    `
                } else {
                    cheaphtml += `
                    <div class="refresh-item">
                        <div class="refresh-pic">
                            <a href="#">
                                <img src="${value.url}" alt="">
                            </a>
                        </div>
                        <div class="refresh-info">
                            <a href="#">
                                ${value.headline}
                                <span>${value.subhead}</span>
                            </a>
                            <div >
                                <p class="content-text first-text">
                                </p>
                                <a href="#" class="more">查看详情</a>
                            </div>
                            <div class="clear_fix">
                                <p class="left">
                                    <span></span>
                                    天猫商城
                                </p>
                                <p class="right">
                                    <a class="btn-right" href="#">去看看&gt;</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    `
                }
            } else if (value.title === 'recommend'){ // 达人推荐
                recommend += `
                <div class="refresh-item">
                    <div class="refresh-pic">
                        <a href="#">
                            <img src="${value.url}" alt="">
                        </a>
                    </div>
                    <div class="refresh-info">
                        <a href="#">
                            ${value.headline}
                            <span>${value.newprice}元</span>
                        </a>
                        <div>
                            <p class="content-text other-text">
                                ${value.text}
                            </p>
                            <a href="#" class="more">查看详情</a>
                        </div>
                        <div class="clear_fix">
                            <p class="left">
                                <img class="user" src="https://mypp-fd.zol-img.com.cn/t_s100x100/g2/M00/07/05/ChMlWlzwju-IIQ8pAAASurDAtH0AAKW5ABEpbYAABLS748.jpg"
                                    alt="">
                                也极端
                            </p>
                            <span class="collect">1</span>
                            <span class="commit">0</span>
                            <p class="right">
                                <span class="time">18:01</span>
                                <a class="btn-right" href="#">去看看&gt;</a>
                            </p>
                        </div>
                    </div>
                </div>

                `
            } else if (value.title === 'goods'){ // 精选好物
                goods += `
                <div class="refresh-item">
                <div class="refresh-pic">
                    <a href="#">
                        <img src="${value.url}" alt="">
                    </a>
                </div>
                <div class="refresh-info">
                    <a href="#">
                        ${value.headline}
                    </a>
                    <div>
                        <p class="content-text other-text">
                            ${value.text}
                        </p>
                        <a href="#" class="more">阅读全文</a>
                    </div>
                    <div class="clear_fix">
                        <p class="left">
                            <img class="user" src="https://mypp-fd.zol-img.com.cn/t_s100x100/g2/M00/07/04/ChMlWVzwjuCIDwlxAAARIzA4XBoAAKW4wNajS0AABE7932.jpg"
                                alt="">
                            不及它
                        </p>
                        <span class="collect">1</span>
                        <span class="commit">0</span>
                        <p class="right">
                            <span class="time">18:01</span>
                            <a class="btn-right" href="#">去看看&gt;</a>
                        </p>
                    </div>
                </div>
            </div>
                `
            }
        })
        $banpic.html(banhtml);
        $hotpic.html(hothtml);
        $buypic.html(buyhtml);
        $hottgpic.html(hottghtml);
        $cheap.html(cheaphtml);
        $recommend.html(recommend);
        $goods.html(goods);
    });
}