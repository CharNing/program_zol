require(['config'], function () {
    require(['jquery'], function () {
        render();
    })
});
//  主页面渲染
function render() {
    const $banpic = $('#banner .banpic li');
    const $hotpic = $('#hot-pic');
    const $buypic = $('#buy-pic');
    const $hottgpic = $('.ad .middle-ad .item');
    const $cheap = $('#first');
    const $recommend = $('#second');
    const $goods = $('#third');
    const $hotWord = $('.search-hot');
    const phpurl = 'http://10.31.155.61/program_zol/ZOL/php/';
    // 搜索框下搜索热词渲染
    $.ajax({
        type: 'get',
        url: phpurl + 'hotword.php',
        dataType: 'json',
    }).done(function (wordData) {
        // console.log(bannerData)
        let wordhtml = '';
        $.each(wordData, function (index, value) {
            wordhtml += `
                    <li>
                        <a href="#">
                            <img src="${value.url}"" alt="">
                        </a>
                    </li>
            `
        })
        $hotWord.html(wordhtml);
    });

    //banner渲染
    $.ajax({
        type: 'get',
        url: phpurl + 'banner.php',
        dataType: 'json',
    }).done(function (bannerData) {
        let banhtml = '';
        $.each(bannerData, function (index, value) {
            banhtml = `
                <a href="#">
                    <img class="lazy" data-original="${value.url}" src="${value.url}"" width = "1009px" height = "377" alt="">
                </a>
            `
            $($banpic[index]).append(banhtml)
        })

    });

    // 今日抢购渲染
    $.ajax({
        type: 'get',
        url: phpurl + 'hot.php',
        dataType: 'json',
    }).done(function (hotData) {
        let hothtml = '';
        $.each(hotData, function (index, value) {
            if (value.top) {
                hothtml += `
                    <li>
                        <a href="http://10.31.155.61/program_zol/ZOL/dist/details.html?sid=${value.sid}" target="_blank">
                            <img class="lazy" src="${value.url}" width="154px" height='154px' alt=""></a>
                        <a href="href="http://10.31.155.61/program_zol/ZOL/dist/details.html?sid=${value.sid}" target="_blank">
                            <p class="over">${value.headline}</p>
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
                        <a href="http://10.31.155.61/program_zol/ZOL/dist/details.html?sid=${value.sid}" target="_blank">
                            <img class="lazy" data-original="${value.url}" src="${value.url}" width='154px' height='154px' alt="">
                        </a>
                        <a href="href="http://10.31.155.61/program_zol/ZOL/dist/details.html?sid=${value.sid}" target="_blank">
                            <p class="over">${value.headline}</p>
                        </a>
                        <div class="price">
                            <span>￥</span>${value.newprice}<span class="old">${value.oldprice}</span>
                        </div>
                    </li>
                `
            }
        })
        $hotpic.html(hothtml);
    })

    // 会买专辑
    $.ajax({
        type: 'get',
        url: phpurl + 'buy.php',
        dataType: 'json',
    }).done(function (buyData) {
        let buyhtml = '';
        $.each(buyData, function (index, value) {
            buyhtml += `
                    <li>
                        <a href="#">
                            <img class='lazy' data-original="${value.url}" src="${value.url}" width='154px' height='154px' alt="">
                        </a>
                    </li>
            `
        })
        $buypic.html(buyhtml);
    })

    // 热门团购
    $.ajax({
        type: 'get',
        url: phpurl + 'hottg.php',
        dataType: 'json',
    }).done(function (hottgData) {
        let hottghtml = '';
        $.each(hottgData, function (index, value) {
            hottghtml += `
            <li class="clear_fix">
                <a href="http://10.31.155.61/program_zol/ZOL/dist/details.html?sid=${value.sid}" target="_blank">
                    <img class="lazy" data-original="${value.url}" src="${value.url}" width='120px' height='90px'  alt="${value.headline}">
                    <span class="description"><i>${value.headline}</i></span>
                </a>
                <p class="ad-price">
                    ￥${value.newprice} <em>￥${value.oldprice}</em>
                </p>
            </li>
            `
        })
        $hottgpic.html(hottghtml);
    })

    // 精选好价
    $.ajax({
        type: 'get',
        url: phpurl + 'cheap.php',
        dataType: 'json',
    }).done(function (cheapData) {
        let cheaphtml = '';
        $.each(cheapData, function (index, value) {
            if (value.text) {
                cheaphtml += `
                <div class="refresh-item">
                    <div class="refresh-pic">
                        <a href="#">
                            <img class="lazy" data-original="${value.url}" src="${value.url}" width = '154px' height='121px' alt="">
                        </a>
                    </div>
                    <div class="refresh-info h">
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
                            <img class="lazy" data-original="${value.url}" src="${value.url}" width='154px' height='121px' alt="">
                        </a>
                    </div>
                    <div class="refresh-info h">
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
        })
        $cheap.html(cheaphtml);
    })

    // 达人推荐
    $.ajax({
        type: 'get',
        url: phpurl + 'recommend.php',
        dataType: 'json',
    }).done(function (recomData) {
        let recommendhtml = '';
        $.each(recomData, function (index, value) {
            recommendhtml += `
                <div class="refresh-item">
                    <div class="refresh-pic">
                        <a href="#">
                            <img class="lazy" data-original="${value.url}" src="${value.url}" width='154px' height='153px' alt="">
                        </a>
                    </div>
                    <div class="refresh-info h">
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
        })
        $recommend.html(recommendhtml);
    })

    // 精选好物
    $.ajax({
        type: 'get',
        url: phpurl + 'goods.php',
        dataType: 'json',
    }).done(function (goodsData) {
        let goodshtml = '';
        $.each(goodsData, function (index, value) {
            goodshtml += `
            <div class="refresh-item">
            <div class="refresh-pic">
                <a href="#">
                    <img class="lazy" data-original="${value.url}" src="${value.url}" width='154px' height='103px' alt="">
                </a>
            </div>
            <div class="refresh-info h">
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
        })
        $goods.html(goodshtml);
    })







}

