require(['config'], function () {
    require(['jquery', 'jqcookie'], function () {
        getcookie();
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
    }

    // 点击增加 或 减少按钮，相应的数量增加或减少
    changeNum();

    // 删除
    del();
    // 清空购物车
    clear();
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
            <tr class = 'goodslist'>
                <td class="car-items">
                    <input type="checkbox" class="choose" checked>
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
                    <em class='new-price'>${data.newprice}</em>
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
                        <a href="javascript:;" class = 'remove'>删除</a>
                        <!-- 点击删除按钮显示此提示 -->
                        <div class="deltip">
                            <p>确认要删除该商品吗？</p>
                            <a href="javascript:;" class='y'>是的</a>
                            <a href="javascript:;" class='n'>取消</a>
                            <i></i>
                        </div>
                    </div>
                </td>
            </tr>
                `;
        $shop.children().append(trhtml);


    }).done(function () {
        // 全选效果
        const $allSelect = $('#all');
        const $choose = $('.choose').not('#all');
        // 点击全选，全部选中
        $allSelect.on('click', function () {
            if ($(this).prop('checked')) {
                $choose.prop('checked', true);
            } else {
                $choose.prop('checked', false);
            }
        })
        // 有一个没选择，全选不选中
        let chooseNum = $choose.length;
        $choose.on('click', function () {
            if ($('.car-items input:checked').length === chooseNum) {
                $allSelect.prop('checked', true);
            } else {
                $allSelect.prop('checked', false);
            }
        })

    })
}
//  点击增加 或 减少按钮，相应的数量增加或减少
function changeNum() {
    const $table = $('.order-table');
    let sum = null;
    let goodsindex = null;

    $table.delegate('a', 'click', function (event) {
        let arrgoodsnum = $.cookie('goodsnum').split(',');
        let $price = $(this).parents('.count').prev().children('.new-price').html();
        let $total = $(this).parents('.count').siblings().children('.total-price');
        var $target = $(event.target);
        if ($target.hasClass('add')) {
            sum = $(this).prev().val();
            goodsindex = arrgoodsnum.indexOf(sum);
            ++sum;
            if (sum < 99) {
                $(this).prev().val(sum);
            } else {
                sum = 99;
                $(this).prev().val(sum);
            }
        }
        if ($target.hasClass('minus')) {
            sum = $(this).next().val();
            goodsindex = arrgoodsnum.indexOf(sum);
            --sum;
            if (sum > 0) {
                $(this).next().val(sum);
            } else {
                sum = 1;
                $(this).next().val(sum);
            }
        }

        $total.html($price *sum);
        arrgoodsnum[goodsindex] = sum;
        $.cookie('goodsnum', arrgoodsnum.toString(), { expires: 30 })
    })

}

// 点击删除按钮，删除相应的商品
function del() {
    const $table = $('.order-table');
    $table.delegate('a', 'click', function (event) {
        var $target = $(event.target);
        if ($target.hasClass('remove')) {
            $(this).next().show();
        }

        $('.deltip').delegate('a', 'click', function (event) {
            var $target = $(event.target);
            if ($target.hasClass('y')) {
                let nownum = $(this).parents('tr').find($('.amount')).val();  // 当前的商品数量
                let arrnum = $.cookie('goodsnum').split(','); // cookie中的数量
                let index = arrnum.indexOf(nownum); // cookie中对应的索引
                let arrsid = $.cookie('goodsid').split(','); // cookie中的sid

                //对数组重新赋值
                arrnum[index] = '';
                arrnum = arrnum.filter((value) => {
                    return value !== '';
                });
                arrsid[index] = '';
                arrsid = arrsid.filter((value) => {
                    return value !== '';
                })
                $.cookie('goodsid', arrsid.toString(), { expires: 30 });
                $.cookie('goodsnum', arrnum.toString(), { expires: 30 });

                // 如果全部删除了，就清空cookie
                if (arrnum == '') {
                    $.cookie('goodsid', '', { expires: -1 });
                    $.cookie('goodsnum', '', { expires: -1 });
                }

                $(this).parents('tr').remove(); // 删除商品列表

            } else if ($target.hasClass('n')) {
                $(this).parent().hide();
            }
        })
    })
}


// 清空购物车
function clear() {
    const $allSelect = $('#all');
    let $deltAll = $('.delt');
    $deltAll.on('click', function () {
        if ($allSelect.prop('checked')) {
            let sure = confirm('确认要清空购物车？')
            if (sure) {
                $.cookie('goodsid', '', { expires: -1 });
                $.cookie('goodsnum', '', { expires: -1 });
                $('.goodslist').remove();
                $('.account').html(0);
                $('.car-state p span').html(0)
            }
        } else {
            alert('请选中全部商品');
        }
    })

}







