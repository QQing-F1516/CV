/* ===============================
   主页 JavaScript 功能
   =============================== */

// 导航栏动画效果
$(document).ready(function() {
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
    var currentWidth = $("#nav li:nth-of-type(3) a").parent("li").width();
    var current = $("li:nth-of-type(3) a").position();
    $("#nav .slide1").css({ left: +current.left, width: currentWidth });
});

// 首页滚动效果
const index2Header = document.querySelector('.index2-header');
const index2Img = document.querySelector('.index2-img');
let scrollDistance = 0;
let requestId = null;

function updateHeaderClipPath() {
    const clipPathValue = `polygon(0 0, 100% 0%, 100% ${(scrollDistance <= 600) ? 100 - ((scrollDistance / 600) * 60) : 75}%, 0 100%)`;
    index2Header.style.clipPath = clipPathValue;
    const scaleValue = 1 + ((scrollDistance / 600) * 1);
    index2Img.style.transform = `scale(${scaleValue})`;
    const opacityValue = (scrollDistance / 600);
}

function scrollHandler(event) {
    if (event.deltaY < 0) {
        scrollDistance = Math.max(0, scrollDistance + event.deltaY);
    } else {
        scrollDistance = Math.min(600, scrollDistance + event.deltaY);
    }
    if (!requestId) {
        requestId = window.requestAnimationFrame(() => {
            updateHeaderClipPath();
            requestId = null;
        });
    }
}

window.addEventListener('wheel', scrollHandler);