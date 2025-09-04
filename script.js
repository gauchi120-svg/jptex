document.addEventListener('DOMContentLoaded', function () {
    
    // 處理方案比較頁籤切換
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有頁籤的 active 狀態
            tabs.forEach(t => t.classList.remove('active'));
            // 為被點擊的頁籤加上 active 狀態
            tab.classList.add('active');

            // 隱藏所有內容
            tabContents.forEach(content => {
                content.classList.remove('active');
                // 如果內容的 id 和頁籤的 data-tab 相符，就顯示它
                if (content.id === tab.dataset.tab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // 處理數據圖表
    const performanceData = {
        before: {
            label: '鍍膜前',
            ir: 75,
            uv: 60,
            light: 92
        },
        after: {
            label: '鍍膜後',
            ir: 12,
            uv: 1,
            light: 85
        }
    };
    
    let donutChart, barChart;
    
    const donutCtx = document.getElementById('performanceDonutChart').getContext('2d');
    const barCtx = document.getElementById('performanceBarChart').getContext('2d');
    
    const donutChartTitle = document.getElementById('donut-chart-title');
    const barChartTitle = document.getElementById('bar-chart-title');

    function createCharts(state) {
        const data = performanceData[state];
        donutChartTitle.textContent = `${data.label}：太陽光譜穿透分析`;
        barChartTitle.textContent = `${data.label}：各項指標穿透率 (%)`;

        // 如果圖表已存在，先銷毀
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
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
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
                indexAxis: 'y', // 讓長條圖變橫向
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // 隱藏圖例
                    },
                     tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 初始載入時，顯示 "鍍膜前" 的圖表
    createCharts('before');
    
    // 綁定按鈕事件
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
