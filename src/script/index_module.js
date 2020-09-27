define([], function() {
    return {
        init: function() {
            //热卖单品渲染
            const $list = $('.sale-bd');
            $.ajax({
                    url: 'http://localhost/p/xiangmu/php/taobao.php',
                    dataType: 'json'
                })
                .done((data) => {
                    let $renderdata = data;
                    let $strhtml = '';
                    $.each($renderdata, function(index, value) {
                        $strhtml += `
                <li class="item-s">
                        <a href="index.html?sid=${value.sid}">
                            <img class="lazy" src="${value.url}" />  
                        </a>
                        <div class="price">
                            <div class="l">
                                <span>￥</span>
                                <em>${value.price}</em>
                            </div>
                            <div class="r">月销
                                <em>${value.sailnumber}</em>
                                笔
                            </div>
                        </div>   
                </li>
                `;
                        if (index == 9) {
                            return false
                        }
                    });
                    $list.html($strhtml);

                    $("img.lazy").lazyload({
                        effect: "fadeIn"
                    });
                });
            //猜你喜欢渲染
            const $list2 = $('.six-floor .list');
            $.ajax({
                    url: 'http://localhost/p/xiangmu/php/taobao.php',
                    dataType: 'json'
                })
                .done((data) => {
                    let $renderdata = data;
                    let $strhtml = '';
                    $.each($renderdata, function(index, value) {
                        $strhtml += `

                <div class="item-c">
                    <a href="index.html?sid=${value.sid}" class="content">
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
                    $.each($renderdata, function(index, value) {
                        $strhtml += `

                <div class="item-c">
                    <a href="index.html?sid=${value.sid}" class="content">
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
                    $.each($renderdata, function(index, value) {
                        $strhtml += `

                <div class="item-c">
                    <a href="index.html?sid=${value.sid}" class="content">
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
                    $.each($renderdata, function(index, value) {
                        $strhtml += `

                <div class="item-c">
                    <a href="index.html?sid=${value.sid}" class="content">
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
                    $list2.html($strhtml);

                    $("img.lazy").lazyload({
                        effect: "fadeIn"
                    });
                });
            //按下消失二维码
            $('.search .search-warp .ewm-box .xh').click(function() {
                $('.search .search-warp .ewm-box').hide();
            });
            //二级菜单
            $('.inner-lf li').on('mouseover', function() {
                // $(this).addClass('active').siblings().removeClass('active');
                $('.inner-lf .cartlist .item-t').eq($(this).index()).show().siblings('.item-t').hide();
                $('.inner-lf .cartlist').show();
            });
            $('.inner-lf li').on('mouseout', function() {
                $('.inner-lf .cartlist').hide();
            });
            $('.inner-lf .cartlist').hover(() => {
                $('.inner-lf .cartlist').show();
            }, () => {
                $('.inner-lf .cartlist').hide();
            });
            //第一个轮播图

            //右侧tab切换
            $('.notice .title li').hover(function() {
                $('.notice .title li a').removeClass('active');
                $(this).children().addClass('active');
                $('.notice .content ul').eq($(this).index()).show().siblings('ul').hide();
            });
        }
    }

})