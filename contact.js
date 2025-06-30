/* ===============================
   联系页面专用JavaScript
   =============================== */

// 导航栏交互功能
$(document).ready(function() {
    // 导航栏滑动效果
    $("#nav a").on("click", function () {
        var position = $(this).parent().position();
        var width = $(this).parent().width();
        $("#nav .slide1").css({ opacity: 1, left: +position.left, width: width });

        // 移除其他active类并添加到当前项
        $("#nav a").removeClass("active");
        $(this).addClass("active");
    });

    $("#nav a").on("mouseover", function () {
        var position = $(this).parent().position();
        var width = $(this).parent().width();
        $("#nav .slide2").css({ opacity: 1, left: +position.left, width: width }).addClass("squeeze");
    });

    $("#nav a").on("mouseout", function () {
        $("#nav .slide2").css({ opacity: 0 }).removeClass("squeeze");
    });

    // 设置当前页面的导航项为激活状态
    var currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'contact.html' || currentPage === '') {
        var activeLink = $("#nav a[href='contact.html']");
        if (activeLink.length) {
            var currentWidth = activeLink.parent("li").width();
            var current = activeLink.position();
            $("#nav .slide1").css({ left: +current.left, width: currentWidth });
            activeLink.addClass("active");
        }
    }
});

// 联系表单处理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 获取表单数据
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // 表单验证
            if (!data.name || !data.email || !data.message) {
                alert('请填写所有必填字段！');
                return;
            }

            // 邮箱格式验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('请输入有效的邮箱地址！');
                return;
            }

            // 这里可以添加发送邮件的逻辑
            console.log('表单数据:', data);

            // 显示成功消息
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> 发送成功！';
            button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';

            setTimeout(() => {
                alert('感谢您的留言！我会尽快回复您。');
                button.innerHTML = originalText;
                button.style.background = 'linear-gradient(135deg, rgb(70, 100, 180) 0%, rgb(102, 126, 234) 100%)';
                this.reset();
            }, 1500);
        });
    }
});

// FAQ 折叠功能
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = question.querySelector('i');

            // 关闭其他打开的FAQ项
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                    const itemIcon = item.querySelector('i');
                    if (itemIcon) {
                        itemIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });

            faqItem.classList.toggle('active');

            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                }
            } else {
                answer.style.maxHeight = '0';
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
});

// 平滑滚动效果
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// 表单输入动画效果
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});
