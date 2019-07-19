function inIframe() {
    try {
        return window.self !== widow.top;
    } catch (e) {
        return true
    }
}

//定义颜色
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"]
var currentQuote = '';
var currentAuthor = '';

//获取引文
function getQuotes() {
    return $.ajax({
        headers: {
            Accept: "application/json"
        },
        url: 'https://gist.githubusercontent.com/camperbot/5a022b' +
            '72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: function (jsonQuotes) {
            if (typeof jsonQuotes == "string") {
                quoteData = JSON.parse(jsonQuotes);
                console.log(quoteData)
            }
        }
    })
}

//获取随机引文
function getRandomQuote() {
    return quoteData.quotes[Math.floor(Math.random() * quoteData.quotes.length)]
}

function getQuote() {
//    拿到当前页面引文、作者
    let randomQuote = getRandomQuote();
    currentQuote = randomQuote.quotes;
    currentAuthor = randomQuote.author;
//    引文部分显示的样式
    $(".quote-text").animate({opacity: 0}, 500, function () {
        $(this).animate({opacity: 1}, 500)
        $("#text").html(randomQuote.quote)
    });
    //   作者部分显示的样式
    $(".quote-author").animate({opacity: 0}, 500, function () {
        $(this).animate({opacity: 1}, 500)
        $("#author").html(currentAuthor)
    });
//页面整体的初始颜色
    var color = Math.floor(Math.random() * colors.length)
    $("html body").animate({
        backgroundColor:colors[color],
        color:colors[color]
})
//    按钮整体初始颜色
    $(".button").animate({
        backgroundColor: colors[color]
    })
}
//页面加载
//获取数据、初始化页面
$(document).ready(function () {
    getQuotes().then(()=>
    getQuote())
//    点击切换按钮，引文与颜色要随机变化
    $("#new-quote").on('click',getQuote)
//    点击喜欢按钮，背景色变化
    $("#like-quote").on("click",function () {
        $(this).css('backgroundColor',"red")
    })

})