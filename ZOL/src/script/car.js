require(['config'], function () {
    require(['jquery', 'jqcookie'], function () {
        getcookie();
        selectAll();
    })
})

// 获取cookie
function getcookie() {
    const $buynum = $('.menu .buynum');
    const $carState = $('.car-state p span');
    // 判断cookie是否存在,存在就渲染页面
    if ($.cookie('goodsid') && $.cookie('goodsnum')) {
        let arrsid = $.cookie('goodsid').split(',');
        let arrnum = $.cookie('goodsnum').split(',');
        for (let i = 0; i < arrsid.length; i++) {
            render(arrsid[i], arrnum[i]);
        }
        $carState.html(arrsid.length);
        $buynum.html(arrsid.length);
        console.log($buynum)
    }


}

// 渲染数据
function render(arrsid, arrnum) {
    const $shop = $('.order-table');
    const phpurl = 'http://10.31.155.61/program_zol/ZOL/php/';
    $.ajax({
        type: 'get',
        url: phpurl + 'details.php',
        dataType: 'json',
        data: {
            id: arrsid,
        }
    }).done(function (data) {
        let trhtml = `
            <tr>
                <td class="car-items">
                    <input type="checkbox" checked>
                    <a href="#" class="pic" target="_blank">
                        <img src="${data.url}">
                    </a>
                    <div class="inforbox">
                        <h3 class="tit">
                            <a href="#" title="${data.headline}">
                            ${data.headline}
                            </a>
                        </h3>
                        <div class="clear_fix">
                            <a href="#" title="7天退换货" class="security seven"></a>
                        </div>
                        <p>颜色：中文原包</p>
                        <div class="info-con">
                            <span>套装：官方标配</span>
                            <div class="info-help">
                                <h5>官方标配：</h5>
                                <p>中文原包</p>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="car-price ">
                    <em class="old-price">${data.oldprice}</em>
                    <em>${data.newprice}</em>
                </td>
                <td class="count">
                    <div class="buynum">
                        <a href="javascript:;" class="minus">-</a>
                        <input type="text" class="amount" value="${arrnum}">
                        <a href="javascript:;" class="add">+</a>
                    </div>
                </td>
                <td class="discount">
                    <!-- <span class="tg">团购</span> -->
                    <p class="time">
                        --
                    </p>
                </td>
                <td>
                    <em class="total-price">${arrnum * data.newprice}</em>
                </td>
                <td class="del">
                    <div class="delbox">
                        <a href="javascript:;" title="移入收藏夹">移入收藏夹</a>
                        <a href="javascript:;">删除</a>
                        <!-- 点击删除按钮显示此提示 -->
                        <div class="deltip">
                            <p>确认要删除该商品吗？</p>
                            <a href="javascript:;">是的</a>
                            <a href="javascript:;">取消</a>
                            <i></i>
                        </div>
                    </div>
                </td>
            </tr>
                `;
            $shop.children().append(trhtml);
    })
    
}

//全选效果

function selectAll(){
    const $all = $('.order-table input');
    const $checkbox = $('.car-items checkbox');
    console.log($all)
    
}



