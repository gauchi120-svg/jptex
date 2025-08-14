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

    // ========= 基礎功能：線上估價計算機 =========
    const quoteForm = document.getElementById('quote-form');
    const quoteResult = document.getElementById('quote-result');

    if (quoteForm && quoteResult) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const productType = document.getElementById('product-type').value;
            const width = parseFloat(document.getElementById('width').value);
            const height = parseFloat(document.getElementById('height').value);

            if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
                quoteResult.innerHTML = '請輸入有效的寬度和高度。';
                quoteResult.style.display = 'block';
                return;
            }

            const prices = {
                'pollentec': 450,
                'tgp-film': 800,
                'other': 300,
            };

            const squareFeet = Math.ceil((width / 30.3) * (height / 30.3));
            const unitPrice = prices[productType];
            const totalPrice = squareFeet * unitPrice;
            const formattedPrice = new Intl.NumberFormat('zh-TW', {
                style: 'currency',
                currency: 'TWD',
                minimumFractionDigits: 0
            }).format(totalPrice);

            quoteResult.innerHTML = `
                您選擇的產品初步估價為：<br>
                <span style="font-size: 1.8em; font-weight: 700;">${formattedPrice}</span>
                <br>
                <small>(此為線上初步估價，最終價格以專人丈量後為準)</small>
            `;
            quoteResult.style.display = 'block';
        });
    }


    // ========= 經典案例功能 (自動由左到右輪播) =========
    const slidesData = [
        { imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7FEB511?q=80&w=1470', linkUrl: 'http://www.jproyal-tex.com/news_detail.php?id=10', altText: '台北文山區 - 網紅推薦案例' },
        { imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470', linkUrl: 'http://www.jproyal-tex.com/portfolio.php', altText: '桃園藝文特區 - 高樓層住家案例' },
        { imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1471', linkUrl: 'http://www.jproyal-tex.com/portfolio.php', altText: '新竹竹北市 - 新建案社區案例' },
        { imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1470', linkUrl: 'http://www.jproyal-tex.com/portfolio.php', altText: '台中七期 - 豪宅安裝案例' }
    ];
    
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffle(slidesData);
    
    const sliderWrapper = document.getElementById('slider-wrapper');
    if (sliderWrapper) {
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
        
        // 為了無縫輪播，複製一份幻燈片接在後面
        sliderWrapper.innerHTML = slidesHTML + slidesHTML;
    }

    // ========= 最新消息功能 (公告+5則新聞輪播) =========
    const combinedNewsData = [
        // 第一則為公告
        { 
            type: 'announcement',
            headline: "夏季限時優惠！全系列防霾紗窗享9折優惠！",
            date: "2025-08-15",
            time: "09:00",
            url: "https://www.google.com/search?q=夏季優惠" 
        },
        // 後面五則為最新消息
        { 
            type: 'news',
            headline: "網紅推薦-對抗髒空氣的好幫手", 
            date: "2024-05-15", 
            time: "11:00", 
            url: "http://www.jproyal-tex.com/news_detail.php?id=10" 
        },
        { 
            type: 'news',
            headline: "防霾小教室", 
            date: "2024-04-22", 
            time: "14:00", 
            url: "http://www.jproyal-tex.com/news_detail.php?id=9" 
        },
        { 
            type: 'news',
            headline: "TGP液態玻璃隔熱膜", 
            date: "2024-04-01", 
            time: "10:30", 
            url: "http://www.jproyal-tex.com/news_detail.php?id=8" 
        },
        { 
            type: 'news',
            headline: "國際級認證-品質保證", 
            date: "2024-03-10", 
            time: "16:00", 
            url: "http://www.jproyal-tex.com/news_detail.php?id=1" 
        },
        { 
            type: 'news',
            headline: "你知道家裡的空氣品質可能比室外還差嗎？", 
            date: "2024-02-20", 
            time: "09:00", 
            url: "http://www.jproyal-tex.com/news_detail.php?id=6" 
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
        
        // 為了無縫輪播，複製一份新聞列表接在後面
        newsList.innerHTML = listItemsHTML + listItemsHTML;
    }
});
