define([], function() {
    return {
        init: function() {
            //详情页面：
            //1.获取地址栏的sid，将sid通过ajax传给后端。
            //2.后端将对应的sid匹配的数据返回给前端。。
            //3.前端进行渲染。
            let datasid = location.search.substring(1).split('=')[1]; //获取sid
            const spic = $('#spic'); //小图
            const bpic = $('#bpic'); //大图
            const sf = $('#sf'); //小放
            const bf = $('#bf'); //大放

            if (!datasid) { //如果sid不存在，设置1
                datasid = 1;
            }
            $.ajax({
                url: 'http://localhost/JS2007/Day%2024_cookie/cart/php/getsid.php',
                data: {
                    sid: datasid
                },
                dataType: 'json'
            }).done((data) => {
                let objdata = data;
                $('#smallpic').attr('src', objdata.url); //图片地址
                $('.loadtitle').html(objdata.title); //标题
                $('.loadpcp').html(objdata.price);
                $('#bpic').attr('src', objdata.url);
                //渲染放大镜效果下面的小图
                let arr = objdata.piclisturl.split(','); //转数组
                let strhtml = '';
                $.each(arr, function(index, value) {
                    strhtml += `
                <li><img src="${value}"/></li>
            `;
                });

                $('#list ul').html(strhtml);

                hidearrow(); //是否显示右箭头
            });
            //4.放大镜效果
            //大图/小图 = 大放/小放
            spic.hover(function() { //显示小放和大放
                sf.css({
                    visibility: 'visible'
                });
                bf.css({
                    visibility: 'visible'
                });
                //计算放大镜的尺寸。
                sf.css({
                    width: spic.outerWidth() * bf.outerWidth() / bpic.outerWidth(),
                    height: spic.outerHeight() * bf.outerHeight() / bpic.outerHeight()
                });
                //计算比例
                let bili = bpic.outerWidth() / spic.outerWidth();
                //小图内容鼠标移动
                spic.on('mousemove', function(e) {
                    let left = e.pageX - $('.wrap').offset().left - sf.width() / 2;
                    let top = e.pageY - $('.wrap').offset().top - sf.height() / 2;
                    if (left <= 0) {
                        left = 0;
                    } else if (left >= spic.width() - sf.width()) {
                        left = spic.width() - sf.width();
                    }

                    if (top <= 0) {
                        top = 0;
                    } else if (top >= spic.height() - sf.height()) {
                        top = spic.height() - sf.height();
                    }

                    sf.css({
                        left: left,
                        top: top
                    });
                    bpic.css({
                        left: -bili * left,
                        top: -bili * top
                    });
                });
            }, function() {
                sf.css({
                    visibility: 'hidden'
                });
                bf.css({
                    visibility: 'hidden'
                });
            });

            // console.log($('#list ul li').size());//0
            // 采用事件委托，进行放大镜的图片切换
            // 通过当前的li找到li内部的图片的地址，赋值给小图和大图
            $('#list ul').on('click', 'li', function() {
                // console.log($(this).find('img').attr('src'));//图片的地址
                let picurl = $(this).find('img').attr('src');
                spic.find('img').attr('src', picurl);
                bpic.attr('src', picurl);
            });

            //小图切换的左右箭头。left/right
            //核心思路：小图的个数有关系
            let piclen = 6; //显示图片的张图
            // console.log($('#list ul li').size());//无法获取li的长度,这里无法事件委托
            // 如果是渲染的结构，无法获取元素对象，可以采用两种方式实现：
            // 1.事件委托。
            // 2.封装一个函数，渲染内部进行调用。
            function hidearrow() { //当li的长度不够6个，隐藏左右箭头
                if ($('#list ul li').size() <= piclen) {
                    $('#right').css({
                        color: '#fff'
                    })
                }
            }

            $('#right').on('click', function() {
                // console.log($('#list ul li').size()); //可以获取li的长度
                let liwidth = $('#list ul li').eq(0).outerWidth(true); //1个li的长度
                if ($('#list ul li').size() > piclen) {
                    piclen++;
                    $('#left').css({ //右箭头触发一次，左箭头可以显示。
                        color: '#333'
                    });
                    if (piclen === $('#list ul li').size()) { //无法点击右箭头，到底了
                        $('#right').css({
                            color: '#fff'
                        });
                    }
                    $('#list ul').animate({
                        left: -(piclen - 6) * liwidth
                    });
                }
            });

            //如果左箭头能够进行移动，piclen长度大于6.
            $('#left').on('click', function() {
                let liwidth = $('#list ul li').eq(0).outerWidth(true); //1个li的长度
                if (piclen > 6) {
                    piclen--;
                    $('#right').css({ //左箭头触发一次，右箭头可以显示。
                        color: '#333'
                    });
                    if (piclen === 6) { //无法点击右箭头，到底了
                        $('#left').css({
                            color: '#fff'
                        });
                    }
                    $('#list ul').animate({
                        left: -(piclen - 6) * liwidth
                    });
                }
            });


            //5.购物车的思路
            //5.1.商品详情页存储购物车的信息 - cookie存
            //存储商品的sid和商品的数量 - 数组或者对象 - 数组
            let arrsid = []; //存储商品sid的数组。
            let arrnum = []; //存储商品数量的数组。
            //当前的商品是第一次购买，还是多次购买，第一次购买创建商品列表，多次购买只需要增加数量。
            //疑问：如何确认当前是第一次还是多次。
            //解答：通过获取cookie来确认，如果是第一次cookie里面肯定不存在当前的sid，否则cookie里面一定存在当前的sid.
            //提前约定存储cookie的sid和数量的key值。
            function getcookie() {
                if (cookie.get('cookiesid') && cookie.get('cookienum')) {
                    arrsid = cookie.get('cookiesid').split(','); //取出cookie将值转换成数组。
                    arrnum = cookie.get('cookienum').split(','); //取出cookie将值转换成数组。
                }
            }

            $('.p-btn a').on('click', function() {
                getcookie();
                //$.inArray(value,array)确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
                //val():读写表单的值。
                if ($.inArray(datasid, arrsid) === -1) { //不存在,添加sid和数量
                    //添加sid
                    arrsid.push(datasid);
                    //将整个sid的数组存入cookie
                    cookie.set('cookiesid', arrsid, 10);
                    //添加数量
                    arrnum.push($('#count').val());
                    //将整个数量的数组存入cookie
                    cookie.set('cookienum', arrnum, 10)
                } else { //存在，添加数量
                    //根据当前的sid找到商品的数量，用当前新加的数量+cookie里面存在的数量。
                    let sidindex = $.inArray(datasid, arrsid);
                    let newarrnum = parseInt(arrnum[sidindex]) + parseInt($('#count').val()); //cookie里面存在的数量 + 当前新加的数量
                    arrnum[sidindex] = newarrnum;
                    //将整个数量的数组存入cookie
                    cookie.set('cookienum', arrnum, 10);
                }
                alert('按钮已经点击了');
            });
        }
    }

})