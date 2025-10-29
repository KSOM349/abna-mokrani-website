// script.js - تأثيرات متقدمة لموقع أبناء مقراني

document.addEventListener('DOMContentLoaded', function() {
    // ========== تأثير التمرير السلس للروابط ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== تأثير ظهور العناصر عند التمرير ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease';
            }
        });
    }, observerOptions);

    // مراقبة جميع العناصر التي نريد إضافة تأثير لها
    const animatedElements = document.querySelectorAll(
        '.service-card, .gallery-item, .hero h1, .hero p, .btn, .contact-info'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // ========== تأثير التمرير للهيدر ==========
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            // التمرير لأسفل - إخفاء الهيدر
            header.style.transform = 'translateY(-100%)';
        } else {
            // التمرير لأعلى - إظهار الهيدر
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;

        // تأثير التعتيم على الهيدر عند التمرير
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // ========== تأثير Hover للبطاقات ==========
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(255, 215, 0, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.2)';
        });
    });

    // ========== تأثير الكتابة على العنوان الرئيسي ==========
    function typeWriterEffect() {
        const heroTitle = document.querySelector('.hero h1');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        
        // بدء التأثير بعد ثانيتين
        setTimeout(type, 2000);
    }

    typeWriterEffect();

    // ========== عداد الإحصائيات (يمكنك تعديل الأرقام) ==========
    function startCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // مدة العد بالمللي ثانية
            const step = target / (duration / 16); // 60 frame per second
            
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, 16);
        });
    }

    // بدء العدادات عندما تظهر في الشاشة
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    });

    // إذا أردت إضافة عدادات مستقبلاً
    // counterObserver.observe(document.querySelector('.counters-section'));

    // ========== تأثير إضاءة الأزرار ==========
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const x = e.offsetX;
            const y = e.offsetY;
            
            this.style.background = `linear-gradient(45deg, 
                var(--purple), 
                var(--blue),
                var(--gold)
            )`;
            this.style.backgroundPosition = `${x}px ${y}px`;
        });

        button.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(45deg, var(--purple), var(--blue))';
            this.style.backgroundPosition = 'center';
        });
    });

    // ========== نظام التبويب للصور (للمستقبل) ==========
    function initImageTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        if (tabButtons.length > 0) {
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // إزالة النشاط من جميع الأزرار
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    // إخفاء جميع المحتويات
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    // تفعيل الزر والمحتوى المحدد
                    button.classList.add('active');
                    const tabId = button.getAttribute('data-tab');
                    document.getElementById(tabId).classList.add('active');
                });
            });
        }
    }

    initImageTabs();

    // ========== تأثير تتبع الماوس ==========
    document.addEventListener('mousemove', function(e) {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    // ========== تحميل الصور بسلاسة ==========
    function preloadImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // إضافة تأثير تحميل سلس للصور
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.onload = function() {
                this.style.opacity = '1';
            };
            
            // إذا فشل تحميل الصورة
            img.onerror = function() {
                this.style.opacity = '1';
                console.log('Failed to load image:', this.src);
            };
        });
    }

    preloadImages();

    // ========== تأثير التردد للعنوانات ==========
    function addPulseEffect() {
        const titles = document.querySelectorAll('.section-title');
        
        titles.forEach(title => {
            setInterval(() => {
                title.style.textShadow = '0 0 20px var(--gold)';
                setTimeout(() => {
                    title.style.textShadow = '0 0 10px var(--gold)';
                }, 500);
            }, 3000);
        });
    }

    addPulseEffect();

    // ========== تحديث السنة في الفوتر تلقائياً ==========
    function updateYear() {
        const yearElement = document.querySelector('#current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    updateYear();

    console.log('🚀 موقع أبناء مقراني يعمل بنجاح!');
});

// ========== وظائف إضافية يمكن استدعاؤها لاحقاً ==========

// وظيفة لإضافة قسم عدادات
function addCountersSection() {
    return `
    <section class="counters">
        <div class="container">
            <div class="counters-grid">
                <div class="counter-item">
                    <div class="counter" data-target="150">0</div>
                    <p>مشروع مكتمل</p>
                </div>
                <div class="counter-item">
                    <div class="counter" data-target="75">0</div>
                    <p>عميل سعيد</p>
                </div>
                <div class="counter-item">
                    <div class="counter" data-target="5">0</div>
                    <p>سنوات خبرة</p>
                </div>
            </div>
        </div>
    </section>
    `;
}

// وظيفة لإضافة نموذج اتصال
function addContactForm() {
    return `
    <div class="contact-form">
        <h3>أرسل رسالة</h3>
        <form id="contactForm">
            <input type="text" placeholder="الاسم الكامل" required>
            <input type="email" placeholder="البريد الإلكتروني" required>
            <textarea placeholder="رسالتك..." required></textarea>
            <button type="submit" class="btn">إرسال الرسالة</button>
        </form>
    </div>
    `;
}

// وظيفة للتحقق من صحة النموذج
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}
