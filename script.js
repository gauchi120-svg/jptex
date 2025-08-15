// JavaScript 代碼

document.addEventListener('DOMContentLoaded', () => {

    // ========= 基礎功能：漢堡選單與平滑滾動 =========
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
        });
    }
    
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            if (mainNav.classList.contains('is-open')) {
                mainNav.classList.remove('is-open');
            }
        });
    });

    // ========= 線上估價計算機 (依據估價單更新) =========
    const quoteForm = document.getElementById('quote-form');
    const quoteResult = document.getElementById('quote-result');
    const productTypeSelect = document.getElementById('product-type');
    const sizeGroup = document.getElementById('size-group');
    const sizeSelect = document.getElementById('product-size');
    const quantityGroup = document.getElementById('quantity-group');
    const quantityInput = document.getElementById('quantity');

    const pricingData = {
        combo: {
            name: '防霾紗窗+隔熱膜組合包',
            options: {
                '小窗 (才數:5)': 1650,
                '半身窗 (才數:10)': 3300,
                '三合一窗 (才數:15)': 4950,
                '落地窗 (才數:20)': 6600
            }
        },
        film_only: {
            name: '隔熱膜早鳥7折包',
            options: {
                'S (100x50cm)': 833,
                'M (100x100cm)': 1667,
                'L (150x100cm)': 2500,
                'XL (200x100cm)': 3333,
                '2XL (200x150cm)': 5000,
                '3XL (200x200cm)': 6667
            }
        }
    };

    if (productTypeSelect) {
        productTypeSelect.addEventListener('change', (e) => {
            const selectedType = e.target.value;
            sizeSelect.innerHTML = '';
            quoteResult.style.display = 'none';

            if (selectedType && pricingData[selectedType]) {
                const options = pricingData[selectedType].options;
                for (const key in options) {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = key;
                    sizeSelect.appendChild(option);
                }
                sizeGroup.style.display = 'block';
                quantityGroup.style.display = 'block';
            } else {
                sizeGroup.style.display = 'none';
                quantityGroup.style.display = 'none';
            }
        });
    }

    if (quoteForm && quoteResult) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const productType = productTypeSelect.value;
            const productSize = sizeSelect.value;
            const quantity = parseInt(quantityInput.value, 10);

            if (!productType || !productSize || isNaN(quantity) || quantity <= 0) {
                quoteResult.innerHTML = '請選擇有效的方案、規格並輸入正確數量。';
                quoteResult.style.display = 'block';
                return;
            }

            const unitPrice = pricingData[productType].options[productSize];
            const totalPrice = unitPrice * quantity;
            const formattedPrice = new Intl.NumberFormat('zh-TW', {
                style: 'currency',
                currency: 'TWD',
                minimumFractionDigits: 0
            }).format(totalPrice);

            quoteResult.innerHTML = `
                您選擇的方案：${pricingData[productType].name}<br>
                規格：${productSize} x ${quantity} 組<br>
                <span style="font-size: 1.1em;">原價總計為：</span>
                <span style="font-size: 1.8em; font-weight: 700;">${formattedPrice}</span>
                <br>
                <small>(此為線上初步估價，最終價格以專人丈量後為準)</small>
            `;
            quoteResult.style.display = 'block';
        });
    }

    // ========= 經典案例功能 (JS控制無縫輪播更新版) =========
    const slidesData = [
        { imageUrl: 'https://i.ibb.co/Y7hc6hg3/Blue-And-Grey-Professional-Physiotherapy-Clinic-Services-Facebook-Ad.png', linkUrl: 'https://ibb.co/99WbJWPN', altText: '知名網紅國動親身體驗' },
        { imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7FEB511?q=80&w=1470', linkUrl: 'http://www.jproyal-tex.com', altText: '過敏體質家庭案例' },
        { imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470', linkUrl: 'http://www.jproyal-tex.com', altText: '注重健康生活宅' },
        { imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1471', linkUrl: 'http://www.jproyal-tex.com', altText: '節能意識家庭實裝' },
        { imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1470', linkUrl: 'http://www.jproyal-tex.com', altText: '都市高樓層住戶' }
    ];

    const sliderContainer = document.querySelector('.slider-container');
    const sliderWrapper = document.getElementById('slider-wrapper');

    if (sliderContainer && sliderWrapper) {
        let slidesHTML = '';
        slidesData.forEach(slide => {
            slidesHTML += `
                <div class="slide">
                    <a href="${slide.linkUrl}" target="_blank">
                        <img src="${slide.imageUrl}" alt="${slide.altText}">
                    </a>
                </div>
            `;
        });
        sliderWrapper.innerHTML = slidesHTML + slidesHTML;

        let currentIndex = 0;
        const totalSlides = slidesData.length;
        
        // 使用 ResizeObserver 確保在視窗大小變化時能正確取得寬度
        const resizeObserver = new ResizeObserver(entries => {
            const slideWidth = entries[0].contentRect.width;
            
            // 設定計時器，自動輪播
            let slideInterval = setInterval(() => {
                currentIndex++;
                
                sliderWrapper.style.transition = 'transform 0.8s ease-in-out';
                sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

                if (currentIndex >= totalSlides) {
                    setTimeout(() => {
                        sliderWrapper.style.transition = 'none';
                        currentIndex = 0;
                        sliderWrapper.style.transform = `translateX(0px)`;
                    }, 800);
                }
            }, 3000); // 每 3 秒切換一次
        });

        resizeObserver.observe(sliderContainer);
    }

    // ========= 最新消息功能 (公告+5則新聞輪播) =========
    const combinedNewsData = [
        { 
            type: 'announcement',
            headline: "嘖嘖募資平台 | 雙項新科技，限時優惠中！",
            date: "2025-08-15",
            time: "09:00",
            url: "https://www.zeczec.com/"
        },
        { 
            type: 'news',
            headline: "過敏性鼻炎？了解環境污染物如何影響您的健康", 
            date: "2025-08-14", 
            time: "18:00", 
            url: "http://www.jproyal-tex.com" 
        },
        { 
            type: 'news',
            headline: "深度解析：市售防霾紗窗的『假靜電』問題", 
            date: "2025-08-13", 
            time: "11:30", 
            url: "http://www.jproyal-tex.com" 
        },
        { 
            type: 'news',
            headline: "技術突破：液態玻璃隔熱膜如何為您節省電費", 
            date: "2025-08-12", 
            time: "15:00", 
            url: "http://www.jproyal-tex.com" 
        },
        { 
            type: 'news',
            headline: "為何要選國際認證？日本皇家防霾紗窗優勢分析", 
            date: "2025-08-11", 
            time: "10:00", 
            url: "http://www.jproyal-tex.com" 
        },
        { 
            type: 'news',
            headline: "滾筒洗衣機30回合測試，靜電力依然100%！", 
            date: "2025-08-10", 
            time: "17:00", 
            url: "http://www.jproyal-tex.com" 
        }
    ];

    const newsList = document.getElementById('news-list');
    if (newsList) {
        let listItemsHTML = '';
        combinedNewsData.forEach(item => {
            const iconClass = item.type === 'announcement' 
                ? 'fas fa-bullhorn announcement-icon' 
                : 'far fa-newspaper news-item-icon';
            
            listItemsHTML += `
                <li>
                    <a href="${item.url}" target="_blank">
                        <i class="${iconClass} news-icon"></i>
                        <div class="news-content">
                            <span class="news-headline">${item.headline}</span>
                            <span class="news-datetime">${item.date} ${item.time}</span>
                        </div>
                    </a>
                </li>
            `;
        });
        
        newsList.innerHTML = listItemsHTML + listItemsHTML;
    }
});
