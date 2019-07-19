const projectName = "random-quote-machine";
//本地存储 localStorage 报错
// localStorage.setItem('example_project', 'Randowm Quote Machine');

//浏览器缩放尺寸为 100% 且页面窗口最大化时运行测试
function inIframe() {
    try {
        //检查当前窗口是否位于顶层窗口
        return window.self !== window.top;//return 布尔
    } catch (e) {
        //位于顶层则返回true
        return true;
    }
}

//将所有颜色存起来
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
//初始化当前引文及作者
var currentQuote = '';
var currentAuthor = '';

//在窗口中打开网页
//open（ 页面url,target属性或窗口名称，项目列表 宽550 高400 不显示浏览器工具栏 不显示滚动条
// 不显示地址字段 不加状态栏  不显示菜单栏 不可调整窗口大小）
function openURL(url) {
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, ' +
        'scrollbars=1 ,location=0 ,status=0,menubar=0, resizable=0');
}

//获取引文数据
function getQuotes() {
    //jquery中用ajax获取数据；ajax通过 HTTP 请求加载远程数据
    return $.ajax({
        //设置请求头，不大懂
        headers: {
            Accept: "application/json"
        },
        //请求句子
        url: 'https://gist.githubusercontent.com/camperbot/5a022b' +
            '72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        //当请求之后传入返回后的数据，以及包含成功代码的字符串
        success: function (jsonQuotes) {//回调函数
            if (typeof jsonQuotes === 'string') {
                quotesData = JSON.parse(jsonQuotes);//把字符串解析成对象
                console.log(quotesData);
            }
        }
    });
}

//确定最开始展现的引文内容，随机获取
function getRandomQuote() {
    //这个quoteData就是ajax获取到的数据，随意获取文章内某个位置的quotes
    return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

//
function getQuote() {
    //确定开始页
    let randomQuote = getRandomQuote();
    // 确定文字与作者
    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;

//   $(selector).animate(styles,speed,easing,callback)
    $(".quote-text").animate({opacity: 0}, 500, function () {//花0.5s完全呈现出引文框
        $(this).animate({opacity: 1}, 500);//当上面的动画完成至100%的时候执行回调函数；花0.5s完全淡出
        $("#text").html(randomQuote.quote);
    });
    $(".quote-author").animate(
        {opacity: 0},
        500,
        function () {
            $(this).animate({opacity: 1}, 500);
            $('#author').html(randomQuote.author);
        }
    );
//   颜色的切换
//    js中要想使用背景色需要引入插件
    var color = Math.floor(Math.random() * colors.length);
    $("html body").animate({
        backgroundColor: colors[color],
        color: colors[color]
    }, 1000);
    $(".button").animate({backgroundColor: colors[color]}, 1000)
}


// ready（function）文档加载后运行的函数
$(document).ready(function () {
    //then()用来处理异步请求，先获取资源再渲染引文
    getQuotes().then(() => {
        getQuote();
    })
    $("#new-quote").on('click', getQuote);
    $("#like-quote").on('click',function () {
        // $(this).css('color',"red")
    });
    $("#weibo-quote").on("click",function () {
        $(this).css("color","red")
    })


})