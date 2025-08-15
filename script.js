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

    // ========= 基礎功能：線上估價計算機 (含低消規則) =========
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

            // 更新價格表，液態玻璃隔熱膜為 150 元/才
            const prices = {
                'pollentec': 450,
                'tgp-film': 150, 
                'both': 550, // 組合優惠價(範例)
            };

            const squareFeet = Math.ceil((width / 30.3) * (height / 30.3));
            const unitPrice = prices[productType];
            let totalPrice = squareFeet * unitPrice;
            
            // 低消規則判斷
            const minimumCharge = 9000;
            const travelFee = 1500;
            let resultHTML = '';

            const formattedPrice = (price) => new Intl.NumberFormat('zh-TW', {
                style: 'currency',
                currency: 'TWD',
                minimumFractionDigits: 0
            }).format(price);

            if (totalPrice < minimumCharge) {
                const finalTotal = totalPrice + travelFee;
                resultHTML = `
                    初步估價為：${formattedPrice(totalPrice)}<br>
                    <strong style="color: #d90429;">因未達低消 ${formattedPrice(minimumCharge)}，將加收車馬費 ${formattedPrice(travelFee)}。</strong><br>
                    <span style="font-size: 1.5em; font-weight: 700;">總計：${formattedPrice(finalTotal)}</span>
                    <br>
                    <small>(最終價格以專人丈量後為準)</small>
                `;
            } else {
                resultHTML = `
                    初步估價為：<br>
                    <span style="font-size: 1.8em; font-weight: 700;">${formattedPrice(totalPrice)}</span>
                    <br>
                    <small>(已達 ${formattedPrice(minimumCharge)} 低消門檻，免收車馬費)</small>
                `;
            }

            quoteResult.innerHTML = resultHTML;
            quoteResult.style.display = 'block';
        });
    }

    // ========= 新增功能：動態生成 Email 連結 (主旨附加日期時間) =========
    const emailLink = document.getElementById('email-link');

    if (emailLink) {
        // 1. 格式化日期時間為 yyyymmddhhmm
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份是 0-11，所以要+1
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const formattedDateTime = `${year}${month}${day}${hours}${minutes}`;

        // 2. 設定 Email 資訊
        const emailAddress = 'paiopaio@msn.com';
        const baseSubject = '預約「日本皇家防霾紗窗/液態玻璃隔熱膜」到府安裝';
        
        // 3. 組合最終主旨
        const finalSubject = `${baseSubject}${formattedDateTime}`;
        
        // 4. 建立並設定完整的 mailto 連結
        emailLink.href = `mailto:${emailAddress}?subject=${encodeURIComponent(finalSubject)}`;
    }
});
