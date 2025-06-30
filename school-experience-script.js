/* ===============================
   在校经历页面 JavaScript 功能
   =============================== */

$(document).ready(function() {
    // 页面加载完成后隐藏加载动画
    setTimeout(function() {
        $('.loader').fadeOut(500);
    }, 1000);

    // 导航栏交互
    $("#nav a").on("click", function () {
        var position = $(this).parent().position();
        var width = $(this).parent().width();
        $("#nav .slide1").css({ opacity: 1, left: +position.left, width: width });
    });
    $("#nav a").on("mouseover", function () {
        var position = $(this).parent().position();
        var width = $(this).parent().width();
        $("#nav .slide2").css({ opacity: 1, left: +position.left, width: width }).addClass("squeeze");
    });
    $("#nav a").on("mouseout", function () {
        $("#nav .slide2").css({ opacity: 0 }).removeClass("squeeze");
    });

    // 设置当前页面的活动状态（在校经历是第3个，索引为5，因为前面有slide1和slide2）
    var currentWidth = $("#nav li:nth-of-type(5) a").parent("li").width();
    var current = $("#nav li:nth-of-type(5) a").position();
    $("#nav .slide1").css({ left: +current.left, width: currentWidth });

    // 滚动动画
    function checkScroll() {
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }

    // 初始检查
    checkScroll();

    // 滚动时检查
    $(window).scroll(function() {
        checkScroll();

        // 返回顶部按钮显示/隐藏
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });

    // 返回顶部功能
    $('#back-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });
});