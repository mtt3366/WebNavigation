!function () {
    //1. 初始化变量
    var startHash = init();
    var keys = startHash.keys;
    var hash = startHash.hash;

    //2. 生成键盘
    generaetKeyboard(keys, hash);

    //3. 监听用户按键盘
    listenTiUser(hash);

    //3.2 百度和谷歌的搜索框

    var searchInput = document.querySelector('#searchInput')
    searchInput.addEventListener('focus', (e) => {
        searchInput.setAttribute("alreadyFocus", true)
    })
    searchInput.addEventListener('blur', (e) => {
        // e.target
        searchInput.removeAttribute("alreadyFocus")
        console.log(searchInput.value)
    })

    var buttonArr = document.querySelectorAll('.search .button')

    buttonArr.forEach(function (button) {
        button.addEventListener('click', (e) => {
            let inputValue = searchInput.value
            switch (e.currentTarget.getAttribute('searchEngine')) {
                case 'baidu': window.open(`https://www.baidu.com/s?wd=${inputValue}`)
                    break;
                case "google": window.open(`https://www.google.com/search?q=${inputValue}`)
                    break;
                case "bing": window.open(`https://www.bing.com/search?q=${inputValue}`)
                    break;
                default: ;
            }
        }, true)
    })


    //4. 优化代码的函数
    function getFromLocalStorage(name) {
        return JSON.parse(localStorage.getItem(name) || 'null');
    }

    function tag(tagename) {
        return document.createElement(tagename);
    }

    function createSpan(textContent) {
        var span = tag("span");
        span.textContent = textContent;
        span.className = "text";
        return span;
    }

    function createButton(id) {
        //每一个kbd里面加入button
        var button = tag("button");
        button.textContent = "编辑";
        // 每一个button的id都是row[index2],即kbd里面的内容,以便区分
        button.id = id;
        //添加button点击事件
        button.addEventListener('click', function (jfglkhj) {
            //☆☆☆☆这里不能用this,也不能用buttonxx,因为buttonxx只是一个容器,每一次循环,里面放的东西都不一样
            // 最后他里面放的东西是最后那个createElement("button").所以不行
            //例如
            // console.log(button);
            // 不管按那个键,所有的打印出来的都是最后一个button
            //解决方法:使用 jfglkhj.target ,指的就是当前完整元素.
            // 例如:
            // console.log(jfglkhj);
            //console.log(jfglkhj.target);
            // console.log(jfglkhj.target.id);

            var key = jfglkhj.target.id;//比如说v
            //或者jfglkhj['target']['id'];
            var x = prompt('给我一个网址');//比如说mtt.com

            hash[key] = x;//赋值

            var button2 = jfglkhj.target;
            var img2 = button2.previousSibling;

            img2.src = 'http://' + x + '/favicon.ico';
            img2.onerror = function (ev) {
                ev.target.src = './point.png';
            };


            // 问题:刷新之后编辑的网址没有了
            // 解决方法:使用localStorage,只要变就备份,只要刷新就覆盖
            //如果hash变更,只要编辑了,我就存
            localStorage.setItem("zzz", JSON.stringify(hash));//JSON.stringify(hash)把hash变成字符串,存到zzz变量里备份

            //上面这句代码的作用:localStorage里有很多桶,吧hash存到zzz这个桶里
            //每一次编辑,就把新的hash存到  浏览器里
            //然后把这个浏览器里的hash覆盖原来的就可以了
            //熟悉原理:一变更就存档

            //每次点击编辑后,就把图标换一下

            

            //阻止事件冒泡
            event.stopPropagation();
        })
        return button;
    }

    function createImg(domain) {
        var img = tag("img");
        if (domain) {//判断这个是否存在
            img.src = 'http://' + domain + '/favicon.ico';
            //加http协议,不然会认为是路径
        } else {//undefined
            //如果src为空,就会进入当前的网址,导致图片显现不出来,所以给他一个存在的图片
            img.src = './point.png';
        }
        img.onerror = function (ev) {
            //onerror事件,监听img的get请求错误事件
            ev.target.src = './point.png';
            //把没有请求到的错误事件的src定为那个点
        };
        return img;
    }

    function init() {
        var keys = {
            '0': { 0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', length: 10 },
            '1': ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            '2': ['z', 'x', 'c', 'v', 'b', 'n', 'm'],

            'length': 3
        };
        var hash = {
            'q': 'qq.com',
            'w': 'weibo.com',
            'e': 'ele.me',
            'r': 'bilibili.com',
            't': 'taobao.com',
            'y': 'bilibili.com',
            'u': 'bilibili.com',
            'i': 'iciba.com',
            'o': 'bilibili.com',
            'p': 'bilibili.com',
            'a': 'aliyun.com',
            's': 'segmentfault.com',
            'd': undefined,
            'f': undefined,
            'g': 'google.com',
            'h': undefined,
            'j': 'jianshu.com',
            'k': undefined,
            'l': 'baidu.com',
            'z': 'zhihu.com',
            'x': 'xiedaimala.com',
            'c': undefined,
            'v': undefined,
            'b': 'bilibili.com',
            'n': 'iqiyi.com',
            'm': 'meituan.com'
        };

        //把localStorage里hash,zzz拿出来
        var hashINLocalStorage = getFromLocalStorage('zzz');
        if (hashINLocalStorage) { //如果hashINLocalStorage不为空,第二次刷新就不为空了.
            hash = hashINLocalStorage;//覆盖hash
        }
        return {
            'keys': keys,
            'hash': hash
        }
    }

    function generaetKeyboard(keys, hash) {
        //遍历keys,生成kbd标签
        for (var index = 0; index < keys['length']; index++) {

            var div = tag('div');
            var main = document.getElementById('mainxxxx');
            main.appendChild(div);

            var row = keys[index];
            for (var index2 = 0; index2 < row.length; index2++) {
                var span = createSpan(row[index2]);
                var button = createButton(row[index2]);
                var img = createImg(hash[row[index2]]);
                var kbd = tag("kbd");
                kbd.className = 'kbd';

                if (hash[row[index2]] === undefined) {
                    kbd.setAttribute('title', '未设置网站导航')
                } else {
                    kbd.setAttribute('title', hash[row[index2]])
                }

                kbd.onclick = function (e) {

                    var website = e.currentTarget.getAttribute('title');
                    if (website === '未设置网站导航') {
                        alert('请编辑此按键的网站再跳转')
                    } else {
                        window.open('http://' + website, "_blank");
                    }

                }

                var kbd_wrapper = tag("div");
                kbd_wrapper.className = 'kbd_wrapper';

                kbd.appendChild(span);
                kbd.appendChild(img);
                kbd.appendChild(button);

                kbd_wrapper.appendChild(kbd);

                div.appendChild(kbd_wrapper);
            }
        }
    }

    function listenTiUser(hash) {
        document.onkeypress = function (sjdhfakdhjlsdka) {
            let searchInput = document.querySelector('#searchInput')
            if (!searchInput.getAttribute('alreadyFocus')) {//如果input没有聚焦

                //sjdhfakdhjlsdka这个参数  包含你想要知道的所有信息,是一个hash
                var key = sjdhfakdhjlsdka['key'];//得到用户的键
                var website = hash[key];//获取网站地址

                // location.href = 'http://'+website;//将键变成新的网站的地址
                //location.href当前地址栏.地址
                //
                if (website === undefined) {
                    alert('请编辑此按键的网站再跳转')
                } else {
                    window.open('http://' + website, "_blank");
                }
                //window.open  窗口.打开  "_blank"新窗口打开.
            }

        };
    }
}()