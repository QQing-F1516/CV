/* ===============================
   项目页面 JavaScript 功能
   =============================== */

// 从HTML内联脚本移动过来的立即修复统计数字显示的函数
(function() {
    function fixStats() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        console.log('修复统计数字，找到元素:', statNumbers.length);

        statNumbers.forEach((element, index) => {
            const countTo = parseFloat(element.dataset.count);
            const suffix = element.dataset.suffix || '';

            if (!isNaN(countTo)) {
                // 设置显示值
                const displayValue = (countTo % 1 === 0) ?
                    Math.floor(countTo) + suffix :
                    countTo.toFixed(1) + suffix;

                element.textContent = displayValue;

                // 确保元素可见
                element.style.color = '#667eea';
                element.style.display = 'block';
                element.style.visibility = 'visible';
                element.style.opacity = '1';
                element.style.fontWeight = '700';

                console.log(`统计数字 ${index + 1} 已修复: ${displayValue}`);
            }
        });
    }

    // 立即执行
    fixStats();

    // DOM加载完成后再次执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixStats);
    }

    // 页面完全加载后再次执行
    window.addEventListener('load', fixStats);

    // 延迟执行确保修复
    setTimeout(fixStats, 100);
    setTimeout(fixStats, 500);
    setTimeout(fixStats, 1000);
})();

// 立即执行函数 - 确保统计数字显示
(function() {
    // 定义一个强制显示统计数字的函数
    function forceShowStats() {
        const allStatNumbers = document.querySelectorAll('.stat-number[data-count]');
        console.log('强制显示统计数字，找到元素数量:', allStatNumbers.length);

        allStatNumbers.forEach((element, index) => {
            const countTo = parseFloat(element.dataset.count);
            const suffix = element.dataset.suffix || '';

            if (!isNaN(countTo)) {
                if (countTo % 1 === 0) {
                    element.textContent = Math.floor(countTo) + suffix;
                } else {
                    element.textContent = countTo.toFixed(1) + suffix;
                }

                // 强制设置样式确保可见
                element.style.color = '#667eea';
                element.style.display = 'block';
                element.style.visibility = 'visible';
                element.style.opacity = '1';

                console.log(`统计数字 ${index + 1} 设置为: ${element.textContent}`);
            }
        });
    }

    // 使用MutationObserver监听DOM变化
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                setTimeout(forceShowStats, 50);
            }
        });
    });

    // 开始观察
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 多次尝试显示统计数字
    setTimeout(forceShowStats, 100);
    setTimeout(forceShowStats, 500);
    setTimeout(forceShowStats, 1000);
    setTimeout(forceShowStats, 2000);
    setTimeout(forceShowStats, 3000);
})();

// 全局错误处理器
window.addEventListener('error', function(e) {
    console.error('JavaScript 错误:', e.error);
    console.error('错误位置:', e.filename, '行:', e.lineno, '列:', e.colno);
});

// 未处理的Promise拒绝
window.addEventListener('unhandledrejection', function(e) {
    console.error('未处理的Promise拒绝:', e.reason);
});

// 页面加载时立即执行的统计数字修复
(function immediateStatsFix() {
    console.log('立即执行统计数字修复');

    function fixStatsDisplay() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        console.log('找到需要修复的统计数字:', statNumbers.length);

        statNumbers.forEach((element, index) => {
            const countTo = parseFloat(element.dataset.count);
            const suffix = element.dataset.suffix || '';

            if (!isNaN(countTo)) {
                // 设置文本内容
                const displayValue = (countTo % 1 === 0) ?
                    Math.floor(countTo) + suffix :
                    countTo.toFixed(1) + suffix;

                element.textContent = displayValue;

                // 强制设置样式
                element.style.cssText = `
                    color: #667eea !important;
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    font-weight: 700 !important;
                    font-size: inherit !important;
                `;

                console.log(`修复统计数字 ${index + 1}: ${displayValue}`);
            }
        });
    }

    // 立即执行一次
    fixStatsDisplay();

    // 定时执行多次确保修复
    const intervals = [100, 300, 500, 1000, 2000];
    intervals.forEach(delay => {
        setTimeout(fixStatsDisplay, delay);
    });
})();







// 纯CSS雷达图动画初始化
function initPureRadarChart() {
    const radarChart = document.querySelector('.pure-radar-chart');
    if (!radarChart) {
        console.error('找不到雷达图元素');
        return false;
    }

    // 动态更新雷达图多边形的点位置
    const skillData = [
        { skill: 'HTML/CSS', value: 90, angle: 0 },
        { skill: 'JavaScript', value: 85, angle: 60 },
        { skill: 'React', value: 80, angle: 120 },
        { skill: 'Vue.js', value: 75, angle: 180 },
        { skill: 'Node.js', value: 75, angle: 240 },
        { skill: 'Python', value: 70, angle: 300 }
    ];

    // 计算多边形的点坐标
    const centerX = 100;
    const centerY = 100;
    const maxRadius = 90;

    const points = skillData.map(skill => {
        const radius = (skill.value / 100) * maxRadius;
        const angleRad = (skill.angle - 90) * Math.PI / 180; // 调整角度，使0度在顶部
        const x = centerX + radius * Math.cos(angleRad);
        const y = centerY + radius * Math.sin(angleRad);
        return `${x},${y}`;
    });

    // 更新多边形路径
    const polygon = radarChart.querySelector('.skill-polygon');
    if (polygon) {
        polygon.setAttribute('points', points.join(' '));
    }

    // 添加动画类
    setTimeout(() => {
        radarChart.classList.add('radar-animated');
    }, 100);

    console.log('纯CSS雷达图初始化成功');
    return true;
}

// 统计数字动画 - 纯JavaScript版本
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    statNumbers.forEach(element => {
        const countTo = parseFloat(element.dataset.count);
        const suffix = element.dataset.suffix || '';
        const duration = 2000;
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 使用easeOutCubic缓动函数
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentCount = countTo * easeOutCubic;

            if (countTo % 1 === 0) {
                // 整数
                element.textContent = Math.floor(currentCount) + suffix;
            } else {
                // 小数
                element.textContent = currentCount.toFixed(1) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                // 确保最终值正确
                if (countTo % 1 === 0) {
                    element.textContent = Math.floor(countTo) + suffix;
                } else {
                    element.textContent = countTo.toFixed(1) + suffix;
                }
            }
        }

        requestAnimationFrame(updateCount);
    });
}

// 动态技能进度条动画 - 纯JavaScript版本
function animateSkillProgress() {
    const progressColumns = document.querySelectorAll('.progress-column');

    progressColumns.forEach((column, columnIndex) => {
        const skillItems = column.querySelectorAll('.skill-progress-item');

        skillItems.forEach((item, itemIndex) => {
            const progressBar = item.querySelector('.progress-bar');
            const percentage = item.querySelector('.skill-percentage');
            const targetWidth = parseInt(progressBar.dataset.width);
            const targetPercentage = parseInt(percentage.dataset.percentage);

            // 计算延迟时间：左列先开始，右列稍后开始，每列内部也有延迟
            const baseDelay = columnIndex * 300; // 右列比左列延迟300ms
            const itemDelay = itemIndex * 200; // 每个项目延迟200ms
            const totalDelay = baseDelay + itemDelay;

            // 延迟动画，让每个进度条依次出现
            setTimeout(() => {
                // 进度条宽度动画
                progressBar.style.width = targetWidth + '%';

                // 百分比数字动画
                const duration = 2000;
                const startTime = performance.now();

                function updatePercentage(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // 使用easeOutCubic缓动函数
                    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                    const currentPercentage = targetPercentage * easeOutCubic;

                    percentage.textContent = Math.floor(currentPercentage) + '%';

                    if (progress < 1) {
                        requestAnimationFrame(updatePercentage);
                    } else {
                        percentage.textContent = targetPercentage + '%';
                    }
                }

                requestAnimationFrame(updatePercentage);
            }, totalDelay);
        });
    });
}

// 项目卡片统计动画 - 纯JavaScript版本
function animateProjectStats() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible && !card.classList.contains('stats-animated')) {
            card.classList.add('stats-animated');

            // 为这个卡片中的统计数字添加动画
            const statNumbers = card.querySelectorAll('.stat-number[data-count]');

            statNumbers.forEach(element => {
                const countTo = parseFloat(element.dataset.count);
                const suffix = element.dataset.suffix || '';
                const duration = 1500;
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // 使用easeOutCubic缓动函数
                    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                    const currentCount = countTo * easeOutCubic;

                    if (countTo % 1 === 0) {
                        // 整数
                        element.textContent = Math.floor(currentCount) + suffix;
                    } else {
                        // 小数
                        element.textContent = currentCount.toFixed(1) + suffix;
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        // 确保最终值正确
                        if (countTo % 1 === 0) {
                            element.textContent = Math.floor(countTo) + suffix;
                        } else {
                            element.textContent = countTo.toFixed(1) + suffix;
                        }
                    }
                }

                requestAnimationFrame(updateCount);
            });
        }
    });
}

// 强制执行项目统计动画（用于确保显示）
function forceAnimateProjectStats() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // 移除已动画标记，强制重新执行
        card.classList.remove('stats-animated');

        const statNumbers = card.querySelectorAll('.stat-number[data-count]');

        statNumbers.forEach(element => {
            const countTo = parseFloat(element.dataset.count);
            const suffix = element.dataset.suffix || '';

            // 直接设置最终值
            if (countTo % 1 === 0) {
                element.textContent = Math.floor(countTo) + suffix;
            } else {
                element.textContent = countTo.toFixed(1) + suffix;
            }
        });
    });
}

// 初始化项目统计数字显示
function initProjectStats() {
    // 等待DOM完全加载后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceAnimateProjectStats);
    } else {
        forceAnimateProjectStats();
    }
}

// 立即尝试初始化（如果DOM已经准备好）
if (document.readyState !== 'loading') {
    setTimeout(forceAnimateProjectStats, 100);
    // 额外的强制显示
    setTimeout(function() {
        const allStatNumbers = document.querySelectorAll('.stat-number[data-count]');
        allStatNumbers.forEach(element => {
            const countTo = parseFloat(element.dataset.count);
            const suffix = element.dataset.suffix || '';
            if (countTo % 1 === 0) {
                element.textContent = Math.floor(countTo) + suffix;
            } else {
                element.textContent = countTo.toFixed(1) + suffix;
            }
        });
    }, 200);
}

// 页面滚动监听
function handleScroll() {
    const skillsSection = document.querySelector('.compact-skills-section');
    if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible && !skillsSection.classList.contains('animated')) {
            skillsSection.classList.add('animated');
            setTimeout(() => {
                initPureRadarChart();
                animateStats();
                animateSkillProgress();
            }, 500);
        }
    }

    // 检查项目卡片动画
    animateProjectStats();
}

// 初始化标志
let chartsInitialized = false;

// 初始化函数
function initializeCharts() {
    if (chartsInitialized) {
        console.log('图表已经初始化过了，跳过重复初始化');
        return;
    }

    console.log('开始初始化纯CSS图表...');

    // 检查DOM元素是否存在
    const radarChart = document.querySelector('.pure-radar-chart');
    if (!radarChart) {
        console.log('雷达图元素还未加载，稍后重试...');
        setTimeout(initializeCharts, 300);
        return;
    }

    // 初始化纯CSS雷达图
    const success = initPureRadarChart();
    if (success) {
        animateStats();
        animateSkillProgress();
        chartsInitialized = true;
        console.log('纯CSS图表初始化完成');
    } else {
        console.log('图表初始化失败，稍后重试...');
        setTimeout(initializeCharts, 1000);
    }
}

// 项目卡片悬停效果增强 - 纯JavaScript版本
function initProjectCardHover() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.card-image img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.card-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
}

// 添加滚动事件监听
window.addEventListener('scroll', handleScroll);

// 页面加载完成后初始化
window.addEventListener('load', function() {
    console.log('页面加载完成，开始初始化');

    // 初始化图表
    setTimeout(initializeCharts, 500);

    // 初始化项目卡片悬停效果
    initProjectCardHover();

    // 初始化导航栏
    initNavigation();

    // 立即初始化项目统计数字显示（确保数字能显示）
    forceAnimateProjectStats();

    // 初始化项目统计数字显示
    initProjectStats();

    // 初始化时检查一次项目统计动画
    setTimeout(animateProjectStats, 1000);

    // 额外的保险措施：延迟再次执行统计数字显示
    setTimeout(function() {
        console.log('执行延迟统计数字显示');
        forceAnimateProjectStats();
        // 同时处理技能区域的统计数字
        const skillsStatNumbers = document.querySelectorAll('.compact-skills-section .stat-number[data-count]');
        skillsStatNumbers.forEach(element => {
            const countTo = parseFloat(element.dataset.count);
            const suffix = element.dataset.suffix || '';
            if (countTo % 1 === 0) {
                element.textContent = Math.floor(countTo) + suffix;
            } else {
                element.textContent = countTo.toFixed(1) + suffix;
            }
        });
    }, 2000);
});

// DOM内容加载完成后的备用初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM内容加载完成');
    console.log('DOM 元素检查:');
    console.log('- 雷达图元素:', document.querySelector('.pure-radar-chart') ? '存在' : '不存在');
    console.log('- nav 元素:', document.getElementById('nav') ? '存在' : '不存在');

    // 立即显示统计数字（不等待动画）
    console.log('立即显示所有统计数字');
    const allStatNumbers = document.querySelectorAll('.stat-number[data-count]');
    console.log('找到统计数字元素数量:', allStatNumbers.length);

    allStatNumbers.forEach((element, index) => {
        const countTo = parseFloat(element.dataset.count);
        const suffix = element.dataset.suffix || '';
        console.log(`设置统计数字 ${index + 1}: ${countTo}${suffix}`);

        if (countTo % 1 === 0) {
            element.textContent = Math.floor(countTo) + suffix;
        } else {
            element.textContent = countTo.toFixed(1) + suffix;
        }
    });

    setTimeout(initializeCharts, 800);
    initProjectCardHover();
    initNavigation();

    // 初始化项目统计数字显示
    initProjectStats();
});

// 窗口大小改变时的处理（纯CSS雷达图不需要特殊处理）
window.addEventListener('resize', function() {
    // 纯CSS雷达图会自动响应，无需额外处理
    console.log('窗口大小已改变');
});

// 返回顶部按钮功能
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
            backToTopBtn.classList.add('visible'); // 兼容两种样式
        } else {
            backToTopBtn.classList.remove('show');
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 页面加载动画处理
const loader = document.querySelector('.loader');
if (loader) {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
}

/* ===============================
   从education.html移植的导航栏JavaScript功能
   =============================== */

// 导航栏jQuery动画效果（需要jQuery库）
function initEducationNavbar() {
    // 检查jQuery是否已加载
    if (typeof $ === 'undefined') {
        console.warn('jQuery未加载，导航栏动画效果将不可用');
        return;
    }

    $(document).ready(function() {
        // 导航栏点击效果
        $("#nav a").on("click", function () {
            var position = $(this).parent().position();
            var width = $(this).parent().width();
            $("#nav .slide1").css({ opacity: 1, left: +position.left, width: width });

            // 移除其他active类，添加到当前点击的链接
            $("#nav a").removeClass("active");
            $(this).addClass("active");
        });

        // 导航栏悬停效果
        $("#nav a").on("mouseover", function () {
            var position = $(this).parent().position();
            var width = $(this).parent().width();
            $("#nav .slide2").css({ opacity: 1, left: +position.left, width: width }).addClass("squeeze");
        });

        $("#nav a").on("mouseout", function () {
            $("#nav .slide2").css({ opacity: 0 }).removeClass("squeeze");
        });

        // 设置当前页面的active状态（项目经验页面）
        var currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'projects.html' || currentPage === '') {
            var activeLink = $("#nav a[href='projects.html']");
            if (activeLink.length) {
                var currentWidth = activeLink.parent("li").width();
                var current = activeLink.position();
                $("#nav .slide1").css({ left: +current.left, width: currentWidth });
                activeLink.addClass("active");
            }
        }
    });
}

// 导航栏滚动效果
function initNavbarScrollEffect() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.modern-navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }
        }
    });
}

// 未处理的Promise拒绝
window.addEventListener('unhandledrejection', function(e) {
    console.error('未处理的Promise拒绝:', e.reason);
});





// 导航栏初始化 - 纯JavaScript版本
function initNavigation() {
    console.log('开始初始化导航栏');

    const nav = document.getElementById('nav');
    if (!nav) {
        console.log('导航栏元素未找到');
        return;
    }

    const slide1 = nav.querySelector('.slide1');
    const slide2 = nav.querySelector('.slide2');
    const navLinks = nav.querySelectorAll('a');

    if (!slide1 || !slide2) {
        console.log('导航栏滑块元素未找到');
        return;
    }

    // 为每个导航链接添加事件监听
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const parent = this.parentElement;
            const rect = parent.getBoundingClientRect();
            const parentRect = parent.parentElement.getBoundingClientRect();

            slide1.style.opacity = '1';
            slide1.style.left = (rect.left - parentRect.left) + 'px';
            slide1.style.width = rect.width + 'px';
        });

        link.addEventListener('mouseover', function() {
            const parent = this.parentElement;
            const rect = parent.getBoundingClientRect();
            const parentRect = parent.parentElement.getBoundingClientRect();

            slide2.style.opacity = '1';
            slide2.style.left = (rect.left - parentRect.left) + 'px';
            slide2.style.width = rect.width + 'px';
            slide2.classList.add('squeeze');
        });

        link.addEventListener('mouseout', function() {
            slide2.style.opacity = '0';
            slide2.classList.remove('squeeze');
        });
    });

    // 设置当前页面的活动状态（项目经验是第6个导航项）
    const currentLink = nav.querySelector('li:nth-of-type(6) a');
    if (currentLink && slide1) {
        const rect = currentLink.parentElement.getBoundingClientRect();
        const parentRect = currentLink.parentElement.parentElement.getBoundingClientRect();
        slide1.style.left = (rect.left - parentRect.left) + 'px';
        slide1.style.width = rect.width + 'px';
    }

    console.log('导航栏初始化完成');
}




