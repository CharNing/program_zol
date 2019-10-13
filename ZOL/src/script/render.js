require(['config'], function () {
    require(['jquery'], function () {
        !function render() {
            const phpurl = 'http://10.31.155.61/program_zol/ZOL/php/';
            $.ajax({
                type: 'get',
                url: phpurl + 'goodslist.php',
                dataType: 'json',
            }).done(function (data) {
                console.log(data);
            })
        }
    })
})