document.addEventListener('DOMContentLoaded', function() {
    // 页面加载动画
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 移动端导航菜单
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // 主题切换功能
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        // 检查本地存储的主题设置
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeSwitch.checked = true;
        }

        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 技能进度条动画
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    };

    // 使用 Intersection Observer 来触发技能条动画
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillsSection);
    }

    // 技能雷达图
    const skillsRadar = document.getElementById('skillsRadar');
    if (skillsRadar && typeof Chart !== 'undefined') {
        const ctx = skillsRadar.getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Database', 'Git'],
                datasets: [{
                    label: '技能水平',
                    data: [90, 85, 80, 75, 70, 85],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // 轮播图功能
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const indicators = carousel.querySelectorAll('.indicator');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // 自动轮播
        setInterval(nextSlide, 5000);
    }

    // 轮播图功能 - 简化版本
    let carousels = {};

    // 全局函数供HTML调用
    window.nextSlide = function(carouselId) {
        console.log('nextSlide:', carouselId);
        if (!carousels[carouselId]) return;

        const carousel = carousels[carouselId];
        carousel.current = (carousel.current + 1) % carousel.total;
        updateCarousel(carouselId);
    };

    window.prevSlide = function(carouselId) {
        console.log('prevSlide:', carouselId);
        if (!carousels[carouselId]) return;

        const carousel = carousels[carouselId];
        carousel.current = (carousel.current - 1 + carousel.total) % carousel.total;
        updateCarousel(carouselId);
    };

    window.currentSlide = function(carouselId, slideIndex) {
        console.log('currentSlide:', carouselId, 'index:', slideIndex);
        if (!carousels[carouselId]) return;

        carousels[carouselId].current = slideIndex - 1;
        updateCarousel(carouselId);

        // 重置自动播放
        if (carousels[carouselId].timer) {
            clearInterval(carousels[carouselId].timer);
            carousels[carouselId].timer = setInterval(() => window.nextSlide(carouselId), 4000);
        }
    };

    function updateCarousel(carouselId) {
        const carousel = carousels[carouselId];
        const element = document.getElementById(carouselId);
        if (!element || !carousel) return;

        // 更新图片显示
        const slides = element.querySelectorAll('.carousel-item');
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === carousel.current);
        });

        // 更新指示器
        const container = element.closest('.carousel-container');
        if (container) {
            const indicators = container.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === carousel.current);
            });
        }

        console.log(`轮播图 ${carouselId} 显示第 ${carousel.current + 1} 张图片`);
    }

    function initCarousel(carouselId) {
        console.log('初始化轮播图:', carouselId);

        const element = document.getElementById(carouselId);
        if (!element) {
            console.error('找不到轮播图元素:', carouselId);
            return;
        }

        const slides = element.querySelectorAll('.carousel-item');
        if (slides.length === 0) {
            console.error('轮播图中没有图片:', carouselId);
            return;
        }

        // 初始化状态
        carousels[carouselId] = {
            current: 0,
            total: slides.length,
            timer: null
        };

        console.log(`轮播图 ${carouselId} 有 ${slides.length} 张图片`);

        // 显示第一张图片
        updateCarousel(carouselId);

        // 启动自动播放
        carousels[carouselId].timer = setInterval(() => {
            window.nextSlide(carouselId);
        }, 4000);

        // 鼠标悬停暂停
        const container = element.closest('.carousel-container');
        if (container) {
            container.addEventListener('mouseenter', () => {
                if (carousels[carouselId].timer) {
                    clearInterval(carousels[carouselId].timer);
                }
            });

            container.addEventListener('mouseleave', () => {
                carousels[carouselId].timer = setInterval(() => window.nextSlide(carouselId), 4000);
            });
        }

        console.log('轮播图初始化完成:', carouselId);
    }

    // 页面加载完成后初始化轮播图
    function initCarousels() {
        console.log('开始初始化轮播图...');
        console.log('当前DOM状态:', document.readyState);

        if (document.readyState === 'loading') {
            console.log('DOM还在加载中，等待DOMContentLoaded事件');
            document.addEventListener('DOMContentLoaded', initCarousels);
            return;
        }

        console.log('DOM已加载完成，开始初始化轮播图');
        setTimeout(() => {
            console.log('开始初始化所有轮播图');

            // 检查页面中实际存在的轮播图元素再进行初始化
            const carouselIds = ['carousel1', 'carousel2', 'carousel-life', 'carousel-study', 'carousel-hobby'];

            carouselIds.forEach(carouselId => {
                const element = document.getElementById(carouselId);
                if (element) {
                    console.log(`找到轮播图元素: ${carouselId}，开始初始化`);
                    initCarousel(carouselId);
                } else {
                    console.log(`页面中不存在轮播图元素: ${carouselId}，跳过初始化`);
                }
            });
        }, 500); // 增加延迟时间
    }

    // 启动初始化
    initCarousels();

    // 额外的安全措施 - 确保在页面完全加载后再次尝试初始化
    window.addEventListener('load', function() {
        console.log('页面完全加载完成，再次检查轮播图初始化');
        setTimeout(() => {
            const carouselIds = ['carousel1', 'carousel2', 'carousel-life', 'carousel-study', 'carousel-hobby'];

            carouselIds.forEach(carouselId => {
                const element = document.getElementById(carouselId);
                if (element && !carousels[carouselId]) {
                    console.log(`${carouselId}未初始化，重新初始化`);
                    initCarousel(carouselId);
                }
            });
        }, 1000);
    });

    // 返回顶部按钮
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 聊天机器人功能
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotBox = document.querySelector('.chatbot-box');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-input button');

    if (chatbotToggle && chatbotBox) {
        chatbotToggle.addEventListener('click', () => {
            chatbotBox.classList.toggle('active');
        });
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbotBox.classList.remove('active');
        });
    }

    function addMessage(message, isUser = false) {
        if (!chatbotMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getBotResponse(userMessage) {
        const responses = {
            '你好': '您好！我是樊青青的AI助手，有什么可以帮助您的吗？',
            '联系方式': '您可以通过邮箱 2060781487@qq.com 或电话 1234560916 联系樊青青。',
            '技能': '樊青青擅长HTML/CSS、JavaScript、React、Node.js等前端技术。',
            '项目': '樊青青有丰富的项目经验，包括电商网站重构等全栈项目。',
            '教育': '樊青青毕业于三亚学院计算机科学与技术专业。'
        };

        for (let key in responses) {
            if (userMessage.includes(key)) {
                return responses[key];
            }
        }

        return '感谢您的提问！如需了解更多信息，请查看简历详情或直接联系樊青青。';
    }

    function sendMessage() {
        if (!chatbotInput || !chatbotInput.value.trim()) return;

        const userMessage = chatbotInput.value.trim();
        addMessage(userMessage, true);

        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            addMessage(botResponse, false);
        }, 1000);

        chatbotInput.value = '';
    }

    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // 联系表单处理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert('感谢您的留言！我会尽快回复您。');
                contactForm.reset();
            } else {
                alert('请填写所有必填字段。');
            }
        });
    }

    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 添加技能卡片悬停效果
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 项目卡片悬停效果
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
