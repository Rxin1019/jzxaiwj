define(['pagination', 'jlazyload'], function() { //依赖分页和懒加载
    return {
        init: function() {
            let array_default = [];
            let array = []; //排序中的数组
            let prev = null; //前一个价格
            let next = null; //后一个价格
            const $list = $('.list');
            $.ajax({
                url: 'http://localhost/p/xiangmu/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '<ul>';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <div class="item-c">
                    <a href="detail.html?sid=${value.sid}" target="_blank" class="content">
                        <div class="img-wrapper">
                            <img class="lazy" data-original="${value.url}">
                        </div>
                        <h4>${value.title}</h4>
                    </a>
                    <p class="info">
                        <span class="price">￥${value.price}</span>
                        <span class="sale">销量：${value.sailnumber}</span>
                    </p>
                    <a href="" class="item-more">
                        <p class="xs">找相似</p>
                        <p>发现更多相似的宝贝></p>
                    </a>
                </div>
                    `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);

                //重置数组
                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;
                //将页面的li元素追加到两个数组中。
                $('.list .item-c').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });

                //懒加载
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
            });

            $('.page').pagination({
                pageCount: 4,
                jump: true,
                coping: true,
                prevContent: '上一页',
                nextContent: '下一页',
                homePage: '首页',
                endPage: '尾页',
                callback: function(api) {
                    console.log(api.getCurrent()); //获取的页码给后端
                    $.ajax({
                        url: 'http://localhost/p/xiangmu/php/listdata.php',
                        data: {
                            page: api.getCurrent() //传输页面
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        let $strhtml = '<ul>';
                        $.each(data, function(index, value) {
                            $strhtml += `
                            <div class="item-c">
                            <a href="detail.html?sid=${value.sid}" target="_blank" class="content">
                                <div class="img-wrapper">
                                    <img class="lazy" src="${value.url}">
                                </div>
                                <h4>${value.title}</h4>
                            </a>
                            <p class="info">
                                <span class="price">￥${value.price}</span>
                                <span class="sale">销量：${value.sailnumber}</span>
                            </p>
                            <a href="" class="item-more">
                                <p class="xs">找相似</p>
                                <p>发现更多相似的宝贝></p>
                            </a>
                        </div>
                                        `;
                        });
                        $strhtml += '</ul>';
                        $list.html($strhtml);

                        array_default = [];
                        array = [];
                        prev = null;
                        next = null;
                        $('.list  .item-c').each(function(index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });
                    });
                }
            });
            $('button').eq(0).on('click', function() {
                //array_default = [li,li,li,li......]
                $.each(array_default, function(index, value) {
                    $('.list ul').append(value);
                });
                return;
            });

            //升序
            $('button').eq(1).on('click', function() {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html().substring(1)); //获取上一个价格
                        next = parseFloat(array[j + 1].find('.price').html().substring(1)); //获取下一个价格
                        //通过价格的判断，改变的是li的位置。
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array, function(index, value) {
                    $('.list ul').append(value);
                });
            });
            //降序
            $('button').eq(2).on('click', function() {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html().substring(1)); //获取上一个价格
                        next = parseFloat(array[j + 1].find('.price').html().substring(1)); //获取下一个价格
                        //通过价格的判断，改变的是li的位置。
                        if (prev < next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array, function(index, value) {
                    $('.list ul').append(value);
                });
            });
        }
    }

});