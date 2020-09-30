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
                        <a href="detail.html?sid=${value.sid}">
                            <img class="lazy" data-original="${value.url}" />  
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
                    <a href="detail.html?sid=${value.sid}" class="content">
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
                    $.each($renderdata, function(index, value) {
                        $strhtml += `

                <div class="item-c">
                    <a href="detail.html?sid=${value.sid}" class="content">
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
                    $.each($renderdata, function(index, value) {
                        $strhtml += `

                <div class="item-c">
                    <a href="detail.html?sid=${value.sid}" class="content">
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
                    $.each($renderdata, function(index, value) {
                        $strhtml += `

                <div class="item-c">
                    <a href="detail.html?sid=${value.sid}" class="content">
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
                $('.inner-lf .cartlist').fadeIn("fast");
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
            let $liW = $('.lunbo li').first().width();
            let index = null;
            $('.lunbo').width($('.lunbo li').size() * $liW + 'px');
            $(".circleNav li").click(function() { //小圆点切换图片
                index = $(this).index() - 1;
                move();
            });
            let $timer = setInterval(move, 3000); //自动轮播
            function move() { //右移
                index++;
                if (index === $(".circleNav li").length + 1) {
                    $('.lunbo').css({
                        left: 0
                    })
                    index = 1
                }
                if (index === $(".circleNav li").length) {
                    $(".circleNav li").eq(0).addClass("select").siblings().removeClass("select");
                }
                if (index === -1) {
                    $('.lunbo').css({
                        left: -($('.lunbo li').length - 1) * $liW + 'px'
                    })
                    index = $(".circleNav li").length - 1;
                }
                $(".circleNav li").eq(index).addClass("select").siblings().removeClass("select");
                $(".lunbo").stop(true).animate({ left: -$liW * index });
            };
            $('.arrow-l').click(function() { //点击左箭头
                index -= 2;
                move();
            });
            $('.arrow-r').click(function() { //点击右箭头
                move();
            });
            $(".pic-box").hover(function() { //鼠标移入暂停，移出继续
                    $('.arrow-l').css({
                        display: 'block'
                    });
                    $('.arrow-r').css({
                        display: 'block'
                    })
                    clearInterval($timer);
                },
                function() {
                    $('.arrow-l').css({
                        display: 'none'
                    });
                    $('.arrow-r').css({
                        display: 'none'
                    })
                    $timer = setInterval(move, 3000);
                });

            //第二个轮播图
            let $liW2 = $('.lunbo2 li').first().width();
            let index2 = null;
            $('.lunbo2').width($('.lunbo2 li').size() * $liW2 + 'px');
            let $timer2 = setInterval(move2, 3000); //自动轮播
            function move2() { //右移
                index2++;
                if (index2 === $(".solidNav li").length + 1) {
                    $('.lunbo2').css({
                        left: 0
                    })
                    index2 = 1;
                }
                if (index2 === $(".solidNav li").length) {
                    $(".solidNav li").eq(0).addClass("selected").siblings().removeClass("selected");
                    $('.head-inner strong i').text(1);
                } else {
                    $('.head-inner strong i').text(index2 + 1);
                }
                if (index2 === -1) {
                    $('.lunbo2').css({
                        left: -($('.lunbo2 li').length - 1) * $liW + 'px'
                    })
                    index2 = $(".solidNav li").length - 1;
                }
                $(".solidNav li").eq(index2).addClass("selected").siblings().removeClass("selected");
                $(".lunbo2").stop(true).animate({ left: -$liW2 * index2 });

            };
            $('.arrow2-l').click(function() { //点击左箭头
                index2 -= 2;
                move2();
            });
            $('.arrow2-r').click(function() { //点击右箭头
                // if(in)
                move2();
            });
            $(".lb2").hover(function() { //鼠标移入暂停，移出继续
                    $('.arrow2-l').css({
                        display: 'block'
                    });
                    $('.arrow2-r').css({
                        display: 'block'
                    })
                    clearInterval($timer2);
                },
                function() {
                    $('.arrow2-l').css({
                        display: 'none'
                    });
                    $('.arrow2-r').css({
                        display: 'none'
                    })
                    $timer2 = setInterval(move2, 3000);
                });

            //楼梯效果
            $(window).on('scroll', function() {
                if ($(window).scrollTop() > 500) {
                    $('.hide-search').slideDown();
                    $('.fixedtool').css({
                        position: 'fixed',
                        top: '75px'
                    })
                } else {
                    $('.hide-search').hide();
                    $('.fixedtool').css({
                        position: 'absolute',
                        top: '580px',
                        right: '290px'
                    });
                }

                $('.floor').each(function(index) {
                    let $height = $(this).offset().top;
                    if ($height > $(window).scrollTop()) {
                        $('.fixedtool a').eq(index).addClass('on').siblings('a').removeClass('on');
                        return false;
                    }
                })
            })
            $('.fixedtool a').click(function() {
                $(this).addClass('on').siblings('a').removeClass('on');
            })

            $('.bt').click(function() {
                let $loutiTop = $('.floor').eq($(this).index() - 1).offset().top - 40;
                $('html').animate({
                    scrollTop: $loutiTop
                })
            })
            $('.fixed-5').click(function() {
                $('html').animate({
                    scrollTop: 0
                })
            });

            //存储
            if (localStorage.getItem('username')) {
                $('.member-foot').hide();
                $('.admin').show();
                $('.hide').hide();
                $('.admin-name').html(localStorage.getItem('username'));
                $('.hello i').html(localStorage.getItem('username'));
            }
            $('.admin-name').hover(function() {
                    $('.admin-name').css({
                        background: '#fff'
                    })
                    $('.admin span').slideDown();
                },
                function() {
                    $('.admin-name').css({
                        background: '#f4f4f4'
                    })
                    $('.admin span').hide();
                });
            $('.admin span').hover(function() {
                    $('.admin-name').css({
                        background: '#fff'
                    })
                    $('.admin span').css({
                        color: '#f22e00'
                    })
                    $('.admin span').show();
                },
                function() {
                    $('.admin-name').css({
                        background: '#f4f4f4'
                    })
                    $('.admin span').css({
                        color: '#6C6C6C'
                    })
                    $('.admin span').slideUp();
                });
            $('.admin span').on('click', function() {
                if (window.confirm('你确定退出登录吗？')) {
                    localStorage.removeItem('username');
                    $('.admin').hide();
                    $('.top-nav-menu:nth-of-type(2)').show();
                    $('.member-foot').show();
                }
            });
            //右侧tab切换
            $('.notice .title li').hover(function() {
                $('.notice .title li a').removeClass('active');
                $(this).children().addClass('active');
                $('.notice .content ul').eq($(this).index()).show().siblings('ul').hide();
            });
        }
    }

})