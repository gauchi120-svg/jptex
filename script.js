document.addEventListener('DOMContentLoaded', function () {
    
    // --- 初始化 Hero 輪播 ---
    const swiper = new Swiper('.swiper', {
        loop: true, 
        autoplay: {
            delay: 2000,
            disableOnInteraction: false, 
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // --- 漢堡選單功能 ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
    const desktopNavLinks = document.querySelectorAll('#desktop-menu .nav-link');
    const mobileBookNowButton = document.getElementById('mobile-book-now-button');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // 【最終修正】為手機版選單連結新增純粹的點擊事件
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden'); // 關閉選單
            mobileNavLinks.forEach(l => l.classList.remove('active')); // 將所有連結的 active 狀態移除
            link.classList.add('active'); // 只為當前點擊的連結加上 active 狀態
            // 閃爍效果的 JS 已移除，完全由 CSS 的 :target 偽類接管
        });
    });
    
    // 【最終修正】為電腦版選單連結也新增同樣的點擊事件
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            desktopNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    if (mobileBookNowButton) {
        mobileBookNowButton.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    }

    /* --- 所有滾動監聽 (IntersectionObserver) 功能已完全移除 --- */

    // --- 方案比較頁籤切換 ---
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tab.dataset.tab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // --- 處理數據圖表 ---
    const performanceData = {
        before: { label: '鍍膜前', ir: 75, uv: 60, light: 92 },
        after: { label: '鍍膜後', ir: 12, uv: 1, light: 85 }
    };
    
    let donutChart, barChart;
    const donutCtx = document.getElementById('performanceDonutChart').getContext('2d');
    const barCtx = document.getElementById('performanceBarChart').getContext('2d');
    const donutChartTitle = document.getElementById('donut-chart-title');
    const barChartTitle = document.getElementById('bar-chart-title');

    function createCharts(state) {
        const data = performanceData[state];
        donutChartTitle.textContent = `${data.label}：太陽光譜穿透分析`;
        barChartTitle.textContent = `${data.label}：各項指標穿透率（%）`;

        if (donutChart) donutChart.destroy();
        donutChart = new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: ['紅外線 (熱能)', '紫外線 (傷害)', '可見光 (亮度)'],
                datasets: [{
                    data: [data.ir, data.uv, data.light],
                    backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(153, 102, 255, 0.7)', 'rgba(255, 205, 86, 0.7)'],
                    borderColor: ['#fff'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: { callbacks: { label: context => `${context.label}: ${context.raw}%` } }
                }
            }
        });
        
        if (barChart) barChart.destroy();
        barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['紅外線 (熱能)', '紫外線 (傷害)', '可見光 (亮度)'],
                datasets: [{
                    label: '穿透率',
                    data: [data.ir, data.uv, data.light],
                    backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 205, 86, 0.5)'],
                    borderColor: ['rgb(255, 99, 132)', 'rgb(153, 102, 255)', 'rgb(255, 205, 86)'],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: { x: { beginAtZero: true, max: 100, ticks: { callback: value => value + '%' } } },
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: context => `${context.label}: ${context.raw}%` } }
                }
            }
        });
    }
    
    createCharts('before');
    
    const btnBefore = document.getElementById('btnBefore');
    const btnAfter = document.getElementById('btnAfter');
    
    btnBefore.addEventListener('click', () => {
        btnBefore.classList.add('active');
        btnAfter.classList.remove('active');
        createCharts('before');
    });
    
    btnAfter.addEventListener('click', () => {
        btnAfter.classList.add('active');
        btnBefore.classList.remove('active');
        createCharts('after');
    });
});
