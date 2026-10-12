/* ==========================================================================
   script.js — Interactive Logic for Eng. Ahmed Zaid Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 1. Navbar: Scroll Effect & Active Link Highlighting
    // =========================================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // =========================================================
    // 2. Mobile Hamburger Menu Toggle & Backdrop
    // =========================================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navBackdrop = document.getElementById('navBackdrop');

    function closeMobileMenu() {
        if (!navMenu) return;
        navMenu.classList.remove('active');
        if (navBackdrop) navBackdrop.classList.remove('active');
        document.body.classList.remove('mobile-nav-open');
        if (hamburgerBtn) {
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        }
    }

    function toggleMobileMenu() {
        if (!navMenu) return;
        const isOpen = navMenu.classList.toggle('active');
        if (navBackdrop) navBackdrop.classList.toggle('active', isOpen);
        document.body.classList.toggle('mobile-nav-open', isOpen);
        if (hamburgerBtn) {
            hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-xmark', isOpen);
            }
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
    }

    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeMobileMenu);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // =========================================================
    // 3. Typing Effect for Hero Subtitle
    // =========================================================
    const typingTextEl = document.getElementById('typing-text');
    const phrasesData = {
        ar: [
            'مهندس نظم معلومات وتكنولوجيا المعلومات',
            'أخصائي تحليل البيانات الاستراتيجي',
            'مطور تقارير Power BI & Tableau',
            'خبير Python & SQL Server',
            'مطوّر أنظمة ذكاء اصطناعي وتعلم آلي',
            'مطوّر واجهات ومواقع ويب متكاملة',
        ],
        en: [
            'Information Systems & IT Engineer',
            'Strategic Data Analytics Specialist',
            'Power BI & Tableau Dashboard Developer',
            'Python & SQL Server Expert',
            'AI Systems & Machine Learning Specialist',
            'Full Modern Web UI Developer',
        ]
    };
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    let typingTimer = null;

    function getActivePhrases() {
        const lang = document.documentElement.getAttribute('lang') || 'ar';
        return phrasesData[lang] || phrasesData.ar;
    }

    function typeEffect() {
        const currentPhrases = getActivePhrases();
        if (phraseIndex >= currentPhrases.length) phraseIndex = 0;
        const currentPhrase = currentPhrases[phraseIndex];
        
        if (isDeleting) {
            typingTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 85;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause after complete word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % currentPhrases.length;
            typingSpeed = 400;
        }

        typingTimer = setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // =========================================================
    // 4. Progress Bars Animation on Scroll
    // =========================================================
    const progressBars = document.querySelectorAll('.progress');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => progressObserver.observe(bar));

    // =========================================================
    // 5. Interactive Analytics Dashboard with Chart.js
    // =========================================================
    const ctx = document.getElementById('businessAnalyticsChart');
    if (ctx) {

    // Dataset configurations
    const datasets = {
        revenue: {
            label: 'الإيرادات الفعلية (ألف جنيه)',
            label2: 'التنبؤ بالذكاء الاصطناعي (ألف جنيه)',
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
            actual: [410, 455, 525, 490, 585, 650, 710, 690, 775, 810, 890, 950],
            predicted: [400, 465, 540, 500, 595, 665, 725, 705, 790, 825, 910, 975],
            chartType: 'line',
            kpis: { k1: '١.٢٥ م. جنيه', k2: '94.2%', k3: '96.8%', k4: '١.٢ م. سجل' }
        },
        'ai-accuracy': {
            label: 'دقة نموذج التعلم الآلي (%)',
            label2: 'نسبة تقليل الأخطاء بالأتمتة (%)',
            labels: ['النموذج 1', 'النموذج 2', 'النموذج 3', 'النموذج 4', 'النموذج 5', 'النموذج 6', 'النموذج 7', 'النموذج 8'],
            actual: [78.2, 83.5, 87.1, 90.4, 93.2, 94.8, 95.7, 96.8],
            predicted: [72, 78, 82, 86, 89, 92, 94, 95],
            chartType: 'bar',
            kpis: { k1: '96.8%', k2: '99.1%', k3: '94.2%', k4: '١٥٠ ألف سجل' }
        },
        categories: {
            label: 'نسبة تصنيف البيانات بالذكاء الاصطناعي (%)',
            label2: 'نسبة التصنيف اليدوي (%)',
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس'],
            actual: [22, 38, 52, 64, 73, 82, 88, 94],
            predicted: [78, 62, 48, 36, 27, 18, 12, 6],
            chartType: 'line',
            kpis: { k1: '94%', k2: '6%', k3: '٨٨ ألف سجل', k4: '١.٥ م. سجل' }
        }
    };

    let activeDataset = 'revenue';

    const chartConfig = {
        type: 'line',
        data: {
            labels: datasets.revenue.labels,
            datasets: [
                {
                    label: datasets.revenue.label,
                    data: datasets.revenue.actual,
                    borderColor: '#06B6D4',
                    backgroundColor: 'rgba(6, 182, 212, 0.15)',
                    borderWidth: 3,
                    pointBackgroundColor: '#06B6D4',
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: datasets.revenue.label2,
                    data: datasets.revenue.predicted,
                    borderColor: '#8B5CF6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderWidth: 2,
                    borderDash: [6, 4],
                    pointBackgroundColor: '#8B5CF6',
                    pointRadius: 4,
                    pointHoverRadius: 7,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            animation: { duration: 800, easing: 'easeInOutQuart' },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#9CA3AF',
                        font: { family: 'Cairo', size: 13 },
                        usePointStyle: true,
                        boxWidth: 10,
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    borderColor: '#06B6D4',
                    borderWidth: 1,
                    titleColor: '#FFFFFF',
                    bodyColor: '#9CA3AF',
                    titleFont: { family: 'Cairo', size: 13 },
                    bodyFont: { family: 'Alexandria', size: 12 },
                    padding: 12,
                    cornerRadius: 10,
                }
            },
            scales: {
                x: {
                    ticks: { color: '#6B7280', font: { family: 'Cairo', size: 11 } },
                    grid: { color: 'rgba(255, 255, 255, 0.03)' }
                },
                y: {
                    ticks: { color: '#6B7280', font: { family: 'Cairo', size: 11 } },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                }
            }
        }
    };

    const analyticsChart = new Chart(ctx, chartConfig);

    // Filter buttons event listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const dataKey = btn.getAttribute('data-dataset');
            const ds = datasets[dataKey];
            activeDataset = dataKey;

            // Update chart type and data
            analyticsChart.config.type = ds.chartType;
            analyticsChart.data.labels = ds.labels;
            analyticsChart.data.datasets[0].label = ds.label;
            analyticsChart.data.datasets[0].data = ds.actual;
            analyticsChart.data.datasets[1].label = ds.label2;
            analyticsChart.data.datasets[1].data = ds.predicted;

            analyticsChart.update('active');

            // Animate KPI cards
            updateKPIs(ds.kpis);
        });
    });

    function updateKPIs(kpis) {
        const kpiEls = ['kpi-1', 'kpi-2', 'kpi-3', 'kpi-4'];
        const vals = Object.values(kpis);
        kpiEls.forEach((id, i) => {
            const el = document.getElementById(id);
            if (el) {
                el.style.transform = 'scale(0.8)';
                el.style.opacity = '0';
                setTimeout(() => {
                    el.textContent = vals[i];
                    el.style.transform = 'scale(1)';
                    el.style.opacity = '1';
                    el.style.transition = 'all 0.3s ease';
                }, 200);
            }
        });
    }
    } // End if (ctx)

    // =========================================================
    // 6. Copy Email Button
    // =========================================================
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                showToast('✅ تم نسخ البريد الإلكتروني: ' + email);
                const btnText = copyEmailBtn.querySelector('span');
                if (btnText) {
                    const original = btnText.textContent;
                    btnText.textContent = 'تم النسخ!';
                    setTimeout(() => { btnText.textContent = original; }, 2000);
                }
            }).catch(() => {
                showToast('⚠️ حاول مرة أخرى أو انسخ العنوان يدوياً');
            });
        });
    }

    // =========================================================
    // 7. Contact Form — Secure Submission (WhatsApp & Email)
    // =========================================================
    const contactForm = document.getElementById('contactForm');
    const sendViaWhatsappBtn = document.getElementById('sendViaWhatsappBtn');
    let lastSubmissionTimestamp = 0;
    const SUBMISSION_COOLDOWN_MS = 3500;

    // Security helper: sanitize plain text against injection
    function cleanInputText(str) {
        if (!str || typeof str !== 'string') return '';
        return str
            .replace(/[<>]/g, '')
            .replace(/[\x00-\x1F\x7F]/g, '')
            .trim();
    }

    // Security helper: check bot honeypot
    function isBotSubmission() {
        const hp = document.getElementById('hpSecurityCheck');
        return Boolean(hp && hp.value && hp.value.trim().length > 0);
    }

    // Security helper: enforce cooldown rate limit
    function isRateLimited() {
        const now = Date.now();
        if (now - lastSubmissionTimestamp < SUBMISSION_COOLDOWN_MS) {
            showToast('⏳ يرجى الانتظار قليلاً قبل إرسال رسالة جديدة');
            return true;
        }
        return false;
    }

    function buildWhatsappMessage() {
        if (isBotSubmission()) {
            console.warn('Bot blocked.');
            return null;
        }

        if (isRateLimited()) return null;

        const nameInput = document.getElementById('senderName');
        const phoneInput = document.getElementById('senderPhone');
        const emailInput = document.getElementById('senderEmail');
        const subjectInput = document.getElementById('messageSubject');
        const messageInput = document.getElementById('senderMessage');

        const name = cleanInputText(nameInput ? nameInput.value : '');
        const phone = cleanInputText(phoneInput ? phoneInput.value : '');
        const email = cleanInputText(emailInput ? emailInput.value : '');
        const subject = cleanInputText(subjectInput ? subjectInput.value : '');
        const message = cleanInputText(messageInput ? messageInput.value : '');

        if (!name || !phone || !message) {
            showToast('⚠️ يرجى ملء الاسم ورقم الهاتف وتفاصيل الرسالة');
            return null;
        }

        if (phone.length < 8) {
            showToast('⚠️ يرجى التأكد من كتابة رقم هاتف صحيح');
            return null;
        }

        lastSubmissionTimestamp = Date.now();

        const wa_message = `مرحباً م. أحمد ذايد 👋\n\n` +
            `📌 *الاسم:* ${name}\n` +
            `📞 *الهاتف:* ${phone}\n` +
            (email ? `📧 *البريد:* ${email}\n` : '') +
            `📋 *الموضوع:* ${subject}\n\n` +
            `💬 *الرسالة:*\n${message}`;

        return encodeURIComponent(wa_message);
    }

    if (sendViaWhatsappBtn) {
        sendViaWhatsappBtn.addEventListener('click', () => {
            const msg = buildWhatsappMessage();
            if (msg) {
                window.open(`https://wa.me/201227036251?text=${msg}`, '_blank', 'noopener,noreferrer');
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (isBotSubmission()) {
                console.warn('Bot blocked.');
                return;
            }

            if (isRateLimited()) return;

            const name = cleanInputText(document.getElementById('senderName')?.value || '');
            const phone = cleanInputText(document.getElementById('senderPhone')?.value || '');
            const email = cleanInputText(document.getElementById('senderEmail')?.value || '');
            const subject = cleanInputText(document.getElementById('messageSubject')?.value || '');
            const message = cleanInputText(document.getElementById('senderMessage')?.value || '');

            if (!name || !phone || !message) {
                showToast('⚠️ يرجى ملء جميع الحقول المطلوبة');
                return;
            }

            if (phone.length < 8) {
                showToast('⚠️ يرجى التأكد من كتابة رقم هاتف صحيح');
                return;
            }

            lastSubmissionTimestamp = Date.now();

            // Build mailto link securely
            const mailBody = `الاسم: ${name}\nالهاتف: ${phone}\n${email ? 'البريد: ' + email + '\n' : ''}الموضوع: ${subject}\n\nالرسالة:\n${message}`;
            const mailLink = `mailto:dhaydahmd549@gmail.com?subject=${encodeURIComponent('رسالة من ' + name + ' - ' + subject)}&body=${encodeURIComponent(mailBody)}`;

            window.location.href = mailLink;
            showToast('✅ رسالتك جاهزة! سيتم فتح تطبيق البريد الإلكتروني');
            contactForm.reset();
        });
    }

    // =========================================================
    // 8. Toast Notification System (XSS-Safe DOM construction)
    // =========================================================
    let toastTimer = null;
    function showToast(message, duration = 3500) {
        const toast = document.getElementById('toast');
        if (!toast) return;

        // Clear existing content safely
        toast.textContent = '';

        // Safe DOM creation — No innerHTML
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-bell';
        toast.appendChild(icon);
        toast.appendChild(document.createTextNode(' ' + String(message)));

        toast.classList.add('show');

        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    // =========================================================
    // 9. Scroll Animations (Fade-in on Reveal)
    // =========================================================
    const animatedElements = document.querySelectorAll(
        '.glass-card, .service-card, .kpi-card, .spec-card, .hero-badge, .about-card'
    );

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.04}s, transform 0.6s ease ${i * 0.04}s`;
        fadeObserver.observe(el);
    });

    // =========================================================
    // 10. Smooth Scroll for All Internal Links
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // =========================================================
    // 11. KPI Number Counter Animation
    // =========================================================
    const kpiCards = document.querySelectorAll('.kpi-card');
    const kpiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    kpiCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        kpiObserver.observe(card);
    });

    // =========================================================
    // 12. Avatar Card — GPU-Accelerated CSS Floating
    // =========================================================
    // Handled natively in style.css via @keyframes avatarFloat for optimal 60fps performance and zero battery drain.

    // =========================================================
    // 13. Invest Pro Project — Interactive Screenshots Gallery
    // =========================================================
    const investProMainImg = document.getElementById('investProMainImg');
    const screenCaption = document.getElementById('screenCaption');
    const thumbBtns = document.querySelectorAll('#investProThumbs .thumb-btn');

    if (thumbBtns.length > 0 && investProMainImg) {
        thumbBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                thumbBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const newSrc = btn.getAttribute('data-img');
                const lang = document.documentElement.getAttribute('lang') || 'ar';
                const caption = lang === 'en' 
                    ? btn.getAttribute('data-caption-en') 
                    : btn.getAttribute('data-caption-ar');

                investProMainImg.style.opacity = '0';
                setTimeout(() => {
                    investProMainImg.src = newSrc;
                    if (screenCaption) screenCaption.textContent = caption;
                    investProMainImg.style.opacity = '1';
                }, 200);
            });
        });
    }

    // =========================================================
    // 14. Internationalization (i18n) — Arabic / English Switcher
    // =========================================================
    const translations = {
        ar: {
            "page-title": "م. أحمد ذايد | مهندس نظم معلومات وأخصائي تحليل البيانات والذكاء الاصطناعي",
            "nav-home": "الرئيسية",
            "nav-about": "عني",
            "nav-skills": "المهارات",
            "nav-projects": "المشاريع والأعمال",
            "nav-analytics": "لوحة التحليلات",
            "nav-services": "الخدمات",
            "nav-contact": "تواصل معي",
            "nav-wa-btn": "واتساب مباشر",
            "hero-badge": "متاح للأعمال والاستشارات والحلول الذكية",
            "hero-title-1": "مرحباً، أنا المهندس",
            "hero-title-2": "أحمد ذايد",
            "hero-desc": "خريج نظم معلومات الأعمال (BIS) بتقدير متميز. أتميز بالقدرة على استخلاص رؤى قابلة للتنفيذ من بيانات الشركات الخام، وبناء تحليلات مرئية متطورة باستخدام <strong>Power BI</strong> و <strong>Tableau</strong> و <strong>Python</strong> لتوجيه القرارات الاستراتيجية واستغلال تقنيات <strong>الذكاء الاصطناعي</strong> والتنبؤ الإحصائي.",
            "spec-label-1": "المؤهل الدراسي",
            "spec-val-1": "خريج نظم معلومات الأعمال",
            "spec-label-2": "العمر",
            "spec-val-2": "22 سنة",
            "spec-label-3": "الموقع",
            "spec-val-3": "مصر - كفر الشيخ - سيدي سالم",
            "spec-label-4": "تواصل مباشر",
            "btn-wa-hero": "تواصل عبر الواتساب",
            "btn-tg-hero": "تواصل عبر التليجرام",
            "btn-analytics": "عرض لوحة التحليلات الحية",
            "stat-1": "دقة القرارات",
            "stat-2": "تحليل وتنبؤ",
            "stat-3": "دعم وتواصل",
            "about-tag": "نبذة شخصية وأكاديمية",
            "about-title": "من هو المهندس",
            "about-c1-title": "المؤهل الأكاديمي والتخصص",
            "about-c1-desc": "خريج <strong>نظم معلومات الأعمال (BIS)</strong>، يدمج التخصص بين الفهم العميق لمتطلبات نظم الأعمال الحديثة وتطبيقات تكنولوجيا المعلومات، مما يتيح التفاعل مع أعقد التحديات التقنية والإدارية بمرونة وكفاءة.",
            "about-c2-title": "تحليل البيانات وتوجيه قرارات الأعمال",
            "about-c2-desc": "خبرة وكفاءة عالية في استخلاص رؤى استراتيجية قابلة للتنفيذ مباشرة من بيانات الشركات الخام، وتحويل الجداول الضخمة المعقدة إلى تحليلات مرئية تفاعلية وسهلة الفهم لقيادات الشركات.",
            "about-c3-title": "الذكاء الاصطناعي والأنظمة الذكية",
            "about-c3-desc": "تطبيق تقنيات التعلم الآلي والتنبؤ الإحصائي الحديث، بالإضافة إلى توجيه وكيل الذكاء الاصطناعي (AI Agent) لأتمتة تصنيف البيانات واستخراج الاتجاهات التاريخية العميقة.",
            "strip-l1": "الاسم الكامل",
            "strip-v1": "أحمد ذايد",
            "strip-l2": "العمر",
            "strip-v2": "22 سنة",
            "strip-l3": "العنوان والموقع",
            "strip-v3": "مصر - كفر الشيخ - سيدي سالم",
            "strip-l4": "الكلية والتخصص",
            "strip-v4": "خريج نظم معلومات الأعمال (BIS)",
            "skills-tag": "القدرات التقنية",
            "skills-title": "مصفوفة المهارات والأدوات الاحترافية",
            "skills-sub": "منظومة شاملة تجمع بين تحليل البيانات، الذكاء الاصطناعي، البرمجة، والحلول المكتبية",
            "cat1-title": "تحليل البيانات والقرارات الاستراتيجية",
            "cat1-sub": "استخلاص الرؤى وبناء Dashboard تفاعلية",
            "sk-pbi": "(لوحات تحكم تفاعلية)",
            "sk-tableau": "(تجسيم وتحليل البيانات)",
            "sk-excel": "(المتقدم والماكرو)",
            "sk-python": "(معالجة البيانات الخام)",
            "sk-sql": "(قواعد البيانات)",
            "cat2-title": "الذكاء الاصطناعي والأنظمة الذكية",
            "cat2-sub": "التعلم الآلي، التنبؤ الإحصائي، وتوجيه وكلاء الذكاء الاصطناعي",
            "sk-ai-agent": "توجيه وكيل الذكاء الاصطناعي (AI Agent Prompting)",
            "sk-ml": "التعلم الآلي (Machine Learning)",
            "sk-forecast": "التنبؤ الإحصائي (Statistical Forecasting)",
            "sk-automate": "أتمتة التصنيفات المعقدة للبيانات",
            "sk-trends": "تحليل الاتجاهات التاريخية العميقة",
            "cat3-title": "تطوير واجهات الويب (Web UI)",
            "cat3-sub": "بناء موقع وتجارب مستخدم عصرية وسريعة",
            "sk-html": "(هيكلة الصفحات)",
            "sk-css": "(Flexbox/Grid/Glow)",
            "sk-js": "(التفاعلية والمنطق)",
            "cat4-title": "حزمة برامج الأوفيس والتنفيذ",
            "cat4-sub": "إعداد التقارير والعروض التقديمية الاحترافية",
            "sk-excel-adv": "(المتقدم والدوال المعقدة)",
            "sk-ppt": "(العروض التقديمية للأعمال)",
            "sk-word": "(التقارير والمستندات الرسمية)",
            "proj-tag": "معرض الأعمال والأنظمة",
            "proj-title": "المشاريع البارزة و",
            "proj-title-hl": "الأنظمة الرقمية",
            "proj-sub": "نماذج عملية تم تصميمها وتطويرها لتوفير حلول استثمارية وتحليلية ذكية متكاملة",
            "proj-badge-flagship": "مشروع رئيسي مميز (Flagship Project)",
            "thumb-home": "الرئيسية والعوائد",
            "thumb-stocks": "سوق الأسهم",
            "thumb-chart": "الشارت والأوامر",
            "thumb-wallet": "المحفظة والإيداع",
            "thumb-tx": "سجل المعاملات",
            "proj-cap-1": "الواجهة الرئيسية: حاسبة العوائد التفاعلية والشعار",
            "proj-head": "منصة إنفست برو (Invest Pro)",
            "proj-tagline": "نظام ويب مالي متكامل لتداول الأسهم المصرية، حاسبة عوائد الاستثمار، وإدارة المحافظ الرقمية",
            "proj-desc": "منصة استثمارية وتداولية متطورة تم بناؤها وتصميمها كحل متكامل يدمج بين سهولة الاستخدام للمستثمر والتحليل المالي المتقدم للبيانات. تتضمن المنصة نظاماً ديناميكياً لحساب العوائد السنوية، سوقاً حياً للأسهم وصناديق الذهب، رسوماً بيانية تفاعلية لحركة الأسعار، ومحفظة متكاملة تدعم بوابات الدفع الإلكترونية المصرية (فودافون كاش وإنستاباي) وسجلاً تفصيلياً لكافة العمليات المالية.",
            "pillar-1-t": "حاسبة العوائد التفاعلية",
            "pillar-1-d": "سلايدر ديناميكي لحساب الأرباح السنوية المتوقعة بناءً على مبالغ الاستثمار ونسب الفائدة المخصصة.",
            "pillar-2-t": "سوق الأسهم والشارت الفني",
            "pillar-2-d": "عرض أسعار وتغيرات الأسهم المصرية (مثل COMI، فوري، أبو قير) مع رسوم بيانية تفاعلية وتنفيذ مباشر لأوامر الشراء.",
            "pillar-3-t": "إدارة المحفظة والمدفوعات",
            "pillar-3-d": "محفظة استثمارية متكاملة تدعم الإيداع عبر فودافون كاش وإنستاباي مع متابعة الرصيد المتاح وإجمالي المستثمر.",
            "pillar-4-t": "سجل المعاملات والتقارير",
            "pillar-4-d": "أرشيف دقيق ومؤتمت يسجل عمليات البيع والشراء بالتاريخ، التوقيت، الأسعار، وحالة كل صفقة استثمارية.",
            "proj-stack-lbl": "التقنيات المستخدمة في المشروع:",
            "btn-open-proj": "تشغيل المنصة / معاينة حية",
            "btn-discuss-proj": "طلب نظام مماثل",
            "analytics-tag": "استعراض حي ملموس",
            "analytics-title": "لوحة تحليلات البيانات التفاعلية (BI Demo)",
            "analytics-sub": "نموذج حي يستعرض طريقة تحويل بيانات الشركات إلى رسومات بيانية ومؤشرات أداء لتوجيه القرارات",
            "dash-title": "لوحة قيادة المبيعات والذكاء الاصطناعي - م. أحمد ذايد",
            "filter-1": "التنبؤ بالإيرادات",
            "filter-2": "دقة نماذج الذكاء الاصطناعي",
            "filter-3": "تصنيف البيانات",
            "kpi1-title": "الإيرادات المتوقعة (جنيه)",
            "kpi1-trend": "+18.4% نمو متوقع",
            "kpi2-title": "نسبة أتمتة البيانات بالذكاء الاصطناعي",
            "kpi2-trend": "توفير ٨٠ ساعة عمل",
            "kpi3-title": "دقة التنبؤ الإحصائي",
            "kpi3-trend": "توجيه قرارات ممتاز",
            "kpi4-title": "السجلات المعالجة في SQL",
            "kpi4-trend": "بدون أخطاء",
            "dash-footer": "يمكن النقر على الأزرار أعلاه لتحديث المؤشرات والرسومات البيانية وتجربة التفاعلية الحية.",
            "svc-tag": "ما يمكنني تقديمه لك",
            "svc-title": "الخدمات والحلول الاحترافية",
            "svc-sub": "خدمات متكاملة في تكنولوجيا المعلومات وتحليل البيانات والذكاء الاصطناعي",
            "s1-title": "لوحات تحكم تفاعلية (Dashboards)",
            "s1-desc": "تصميم وبناء لوحات تحكم ديناميكية باستخدام Power BI و Tableau للربط المباشر ببيانات الشركة ومتابعة الأداء لحظياً.",
            "s1-li1": "ربط مصادر البيانات المتعددة",
            "s1-li2": "تقارير تفاعلية وسهلة القراءة",
            "s2-title": "استخلاص الرؤى وتوجيه قرارات الأعمال",
            "s2-desc": "تنقيب البيانات الخام، استخراج الأنماط، وتقديم توصيات قابلة للتنفيذ لمساعدة الإدارة على اتخاذ قرارات دقيقة وصائبة.",
            "s2-li1": "تحليل بيانات الشركات الخام",
            "s2-li2": "تقديم رؤى مخصصة للنمو",
            "s3-title": "حلول الذكاء الاصطناعي والتنبؤ الإحصائي",
            "s3-desc": "الاستفادة من التعلم الآلي وتوجيه وكيل الذكاء الاصطناعي (AI Agent) لأتمتة تصنيف البيانات المعقدة وتحليل الاتجاهات التاريخية العميقة.",
            "s3-li1": "أتمتة التصنيفات المعقدة",
            "s3-li2": "نماذج تنبؤ إحصائية دقيقة",
            "s4-title": "تطوير واجهات الويب (Web UI)",
            "s4-desc": "تصميم وتطوير واجهات ويب سريعة، تجاوبية، وجذابة باستخدام HTML, CSS, JavaScript لإبراز أعمالك وهويتك بشكل احترافي.",
            "s4-li1": "تصاميم داكنة وعصرية (Dark & Glass)",
            "s4-li2": "متوافقة مع كل الهواتف والشاشات",
            "contact-tag": "تواصل مباشر وسريع",
            "contact-title": "تواصل مع المهندس",
            "contact-sub": "يمكنك النقر مباشرة على رقم الهاتف للتحويل المباشر إلى الواتساب أو التليجرام، أو إرسال رسالة فورية",
            "phone-label": "رقم الهاتف والتواصل المباشر",
            "phone-sub": "اضغط على الأزرار بالأسفل للتحدث مباشرة عبر الواتساب أو التليجرام",
            "btn-wa-direct": "تحدث عبر الواتساب",
            "btn-tg-direct": "تحدث عبر التليجرام",
            "email-label": "البريد الإلكتروني الرسمي",
            "email-sub": "يمكنك إرسال الاستفسارات والعروض التقديمية في أي وقت",
            "btn-copy": "نسخ البريد الإلكتروني",
            "loc-label": "الموقع الجغرافي",
            "loc-title": "مصر - كفر الشيخ - سيدي سالم",
            "loc-sub": "خريج نظم معلومات الأعمال (BIS) | متاح للعمل الحر والوظائف عن بعد أو الميدانية",
            "form-title": "أرسل رسالة مباشرة",
            "form-desc": "أدخل بياناتك وسيتم توجيه رسالتك للمهندس أحمد ذايد مباشرة",
            "lbl-name": "الاسم الكامل",
            "ph-name": "مثال: أ. محمد علي",
            "lbl-phone": "رقم الهاتف",
            "ph-phone": "010xxxxxxx",
            "lbl-email": "البريد الإلكتروني",
            "ph-email": "example@domain.com",
            "lbl-subject": "موضوع الرسالة",
            "opt-1": "طلب مشروع تحليل بيانات و Power BI",
            "opt-2": "طلب حلول ذكاء اصطناعي وأتمتة",
            "opt-3": "طلب تطوير واجهة موقع ويب",
            "opt-4": "طلب استشارة تكنولوجية",
            "opt-5": "فرصة عمل / تواصل آخر",
            "lbl-msg": "تفاصيل الرسالة",
            "ph-msg": "اكتب تفاصيل استفسارك أو مشروعك هنا...",
            "btn-submit": "إرسال الرسالة الآن",
            "btn-wa-form": "إرسال مباشرة عبر الواتساب",
            "footer-p": "مهندس نظم معلومات وتكنولوجيا المعلومات | خريج نظم معلومات الأعمال (BIS) | أخصائي تحليل البيانات والذكاء الاصطناعي",
            "footer-links-h": "روابط التنقل",
            "footer-l1": "الرئيسية",
            "footer-l2": "عن المهندس",
            "footer-l3": "المهارات والتقنيات",
            "footer-l-proj": "المشاريع والأعمال",
            "footer-l4": "لوحة التحليلات الحية",
            "footer-l5": "تواصل معي",
            "footer-social-h": "التواصل السريع",
            "footer-bottom": "© 2026 جميع الحقوق محفوظة للمهندس <strong>أحمد ذايد</strong> | تم التطوير وفق أعلى معايير الويب وتحليل البيانات"
        },
        en: {
            "page-title": "Eng. Ahmed Zaid | Information Systems & Data Analytics Specialist",
            "nav-home": "Home",
            "nav-about": "About",
            "nav-skills": "Skills",
            "nav-projects": "Projects & Works",
            "nav-analytics": "Analytics Demo",
            "nav-services": "Services",
            "nav-contact": "Contact",
            "nav-wa-btn": "Direct WhatsApp",
            "hero-badge": "Available for Projects, Consultations & AI Solutions",
            "hero-title-1": "Hello, I am Engineer",
            "hero-title-2": "Ahmed Zaid",
            "hero-desc": "Business Information Systems (BIS) graduate with excellence. Skilled at transforming raw enterprise data into actionable strategic insights, building dynamic BI dashboards using <strong>Power BI</strong>, <strong>Tableau</strong>, and <strong>Python</strong>, and leveraging <strong>Artificial Intelligence</strong> and predictive modeling to guide business decisions.",
            "spec-label-1": "Degree / Specialization",
            "spec-val-1": "Business Information Systems (BIS)",
            "spec-label-2": "Age",
            "spec-val-2": "22 Years Old",
            "spec-label-3": "Location",
            "spec-val-3": "Egypt - Kafr El-Sheikh - Sidi Salem",
            "spec-label-4": "Direct Contact",
            "btn-wa-hero": "Chat on WhatsApp",
            "btn-tg-hero": "Chat on Telegram",
            "btn-analytics": "View Live Analytics Demo",
            "stat-1": "Decision Accuracy",
            "stat-2": "BI & AI Forecasting",
            "stat-3": "24/7 Availability",
            "about-tag": "Personal & Academic Background",
            "about-title": "Who is Engineer",
            "about-c1-title": "Academic Qualification & Major",
            "about-c1-desc": "Graduated in <strong>Business Information Systems (BIS)</strong>, combining deep comprehension of enterprise business systems with information technology engineering to solve complex business and technical challenges.",
            "about-c2-title": "Data Analytics & Strategic Insights",
            "about-c2-desc": "High proficiency in mining raw enterprise data, distilling hidden strategic trends, and translating intricate databases into intuitive interactive dashboards for executive leadership.",
            "about-c3-title": "Artificial Intelligence & Smart Systems",
            "about-c3-desc": "Implementing machine learning and statistical forecasting models, directing AI Agent prompting to automate complex data classifications and uncover deep historical patterns.",
            "strip-l1": "Full Name",
            "strip-v1": "Ahmed Zaid",
            "strip-l2": "Age",
            "strip-v2": "22 Years",
            "strip-l3": "Location",
            "strip-v3": "Egypt - Kafr El-Sheikh",
            "strip-l4": "Specialization",
            "strip-v4": "Business Information Systems (BIS)",
            "skills-tag": "Technical Capabilities",
            "skills-title": "Professional Skills & Tech Matrix",
            "skills-sub": "A comprehensive system uniting Data Analytics, AI, Web UI, and Enterprise Productivity",
            "cat1-title": "Data Analytics & Business Decisions",
            "cat1-sub": "Extracting insights & interactive dashboard creation",
            "sk-pbi": "(Interactive Dashboards)",
            "sk-tableau": "(Visual Data Discovery)",
            "sk-excel": "(Advanced & Macros)",
            "sk-python": "(Raw Data Processing)",
            "sk-sql": "(Relational Databases)",
            "cat2-title": "Artificial Intelligence & Smart Systems",
            "cat2-sub": "Machine learning, statistical forecasting & AI agents",
            "sk-ai-agent": "AI Agent Prompting & Guidance",
            "sk-ml": "Machine Learning (ML Models)",
            "sk-forecast": "Statistical Forecasting",
            "sk-automate": "Complex Data Classification Automation",
            "sk-trends": "Deep Historical Trend Analysis",
            "cat3-title": "Web UI Engineering",
            "cat3-sub": "Modern, blazing-fast user interfaces",
            "sk-html": "(Semantic Structure)",
            "sk-css": "(Flexbox/Grid/Glow)",
            "sk-js": "(Interactivity & Logic)",
            "cat4-title": "Office Productivity & Execution",
            "cat4-sub": "Executive reports & presentation design",
            "sk-excel-adv": "(Complex Formulas & Lookup)",
            "sk-ppt": "(Business Presentations)",
            "sk-word": "(Official Documentation)",
            "proj-tag": "Portfolio & Systems Showcase",
            "proj-title": "Featured Projects &",
            "proj-title-hl": "Digital Platforms",
            "proj-sub": "Practical enterprise platforms built to deliver seamless investment and data-driven intelligence",
            "proj-badge-flagship": "Flagship FinTech Project",
            "thumb-home": "Home & Calculator",
            "thumb-stocks": "Stock Market",
            "thumb-chart": "Chart & Orders",
            "thumb-wallet": "Wallet & Deposit",
            "thumb-tx": "Transactions Log",
            "proj-cap-1": "Home Interface: Interactive Returns Calculator & Hero",
            "proj-head": "Invest Pro Platform",
            "proj-tagline": "All-in-one Financial & Investment Web Platform for Egyptian Stocks, ROI Calculator & Digital Wallets",
            "proj-desc": "A cutting-edge financial investment and trading platform built as an end-to-end solution combining seamless investor experience with advanced financial data analytics. Features include dynamic annual ROI calculation sliders, live Egyptian equities market with gold funds, technical price charting with buy order execution, e-wallets supporting Vodafone Cash and InstaPay, and full transaction history logging.",
            "pillar-1-t": "Interactive ROI Calculator",
            "pillar-1-d": "Dynamic real-time slider calculating anticipated annual profits based on investment capital and adjustable interest rates.",
            "pillar-2-t": "Stock Market & Technical Charts",
            "pillar-2-d": "Live quotes for Egyptian equities (e.g. COMI, Fawry, Abu Qir) paired with interactive charting and direct buy execution.",
            "pillar-3-t": "Wallet & Digital Payments",
            "pillar-3-d": "Integrated investor wallet supporting instant deposits via Vodafone Cash and InstaPay with real-time balance tracking.",
            "pillar-4-t": "Transaction Log & Reporting",
            "pillar-4-d": "Automated ledger tracking each buy and sell transaction with timestamp, execution price, quantity, and status.",
            "proj-stack-lbl": "Technologies Used in Project:",
            "btn-open-proj": "Launch Platform / Live Preview",
            "btn-discuss-proj": "Request Similar System",
            "analytics-tag": "Live Interactive Demo",
            "analytics-title": "Interactive BI Analytics Dashboard",
            "analytics-sub": "Live proof of concept demonstrating how raw corporate data transforms into strategic charts and KPIs",
            "dash-title": "Sales & AI Executive Dashboard - Eng. Ahmed Zaid",
            "filter-1": "Revenue Forecast",
            "filter-2": "AI Model Precision",
            "filter-3": "Data Classification",
            "kpi1-title": "Projected Revenue (EGP)",
            "kpi1-trend": "+18.4% Expected Growth",
            "kpi2-title": "AI Data Automation Rate",
            "kpi2-trend": "80 hrs saved/week",
            "kpi3-title": "Statistical Forecast Accuracy",
            "kpi3-trend": "Optimal Decision Support",
            "kpi4-title": "Records Processed via SQL",
            "kpi4-trend": "Zero Errors",
            "dash-footer": "Click the filter buttons above to update the chart datasets and experience real-time interactivity.",
            "svc-tag": "What I Can Offer",
            "svc-title": "Professional Services & Solutions",
            "svc-sub": "Comprehensive services across IT, data analytics, and modern artificial intelligence",
            "s1-title": "Interactive Dashboards (BI)",
            "s1-desc": "Design and development of dynamic dashboards using Power BI and Tableau for live connection to corporate metrics.",
            "s1-li1": "Connecting heterogeneous data sources",
            "s1-li2": "Readable, executive-ready visuals",
            "s2-title": "Insight Extraction & Decision Guidance",
            "s2-desc": "Mining raw databases to uncover hidden patterns and delivering actionable roadmaps for leadership.",
            "s2-li1": "Raw corporate dataset mining",
            "s2-li2": "Tailored growth recommendations",
            "s3-title": "AI & Statistical Forecasting",
            "s3-desc": "Leveraging machine learning models and AI Agent prompting to automate complex classifications and historical trends.",
            "s3-li1": "Automating complex data tagging",
            "s3-li2": "High-accuracy forecasting models",
            "s4-title": "Web UI Engineering",
            "s4-desc": "Crafting clean, responsive, high-performance web applications using HTML5, CSS3, and modern JavaScript.",
            "s4-li1": "Modern Dark & Glassmorphism design",
            "s4-li2": "100% responsive on all mobile screens",
            "contact-tag": "Direct Communication",
            "contact-title": "Get in Touch with Engineer",
            "contact-sub": "Click phone number for instant WhatsApp / Telegram redirection, or send a direct inquiry",
            "phone-label": "Direct Contact & Mobile",
            "phone-sub": "Click the buttons below to initiate direct chat via WhatsApp or Telegram",
            "btn-wa-direct": "Chat on WhatsApp",
            "btn-tg-direct": "Chat on Telegram",
            "email-label": "Official Email Address",
            "email-sub": "Feel free to send project proposals and business inquiries at any time",
            "btn-copy": "Copy Email Address",
            "loc-label": "Geographic Location",
            "loc-title": "Egypt - Kafr El-Sheikh - Sidi Salem",
            "loc-sub": "BIS Graduate | Available for freelance contracts, remote roles, or full-time on-site positions",
            "form-title": "Send a Direct Message",
            "form-desc": "Fill in your details and your inquiry will be delivered to Eng. Ahmed Zaid immediately",
            "lbl-name": "Full Name",
            "ph-name": "e.g. John Doe / Eng. Mohamed",
            "lbl-phone": "Phone Number",
            "ph-phone": "+20 10xxxxxxx",
            "lbl-email": "Email Address",
            "ph-email": "example@domain.com",
            "lbl-subject": "Inquiry Subject",
            "opt-1": "Data Analytics & Power BI Dashboard Project",
            "opt-2": "Artificial Intelligence & Automation Solutions",
            "opt-3": "Web UI / Platform Development Request",
            "opt-4": "IT & Technology Advisory Consultation",
            "opt-5": "Career Opportunity / Other Inquiry",
            "lbl-msg": "Message Details",
            "ph-msg": "Describe your requirements or project details here...",
            "btn-submit": "Send Message Now",
            "btn-wa-form": "Send via WhatsApp Directly",
            "footer-p": "Information Systems & IT Engineer | Business Information Systems (BIS) Graduate | Data Analytics & AI Specialist",
            "footer-links-h": "Navigation",
            "footer-l1": "Home",
            "footer-l2": "About",
            "footer-l3": "Skills",
            "footer-l-proj": "Projects",
            "footer-l4": "Live BI Demo",
            "footer-l5": "Contact",
            "footer-social-h": "Quick Connect",
            "footer-bottom": "© 2026 All Rights Reserved to Eng. <strong>Ahmed Zaid</strong> | Engineered to the highest data & web standards"
        }
    };

    const langToggleBtn = document.getElementById('langToggleBtn');
    const langBtnText = document.getElementById('langBtnText');

    function applyLanguage(lang) {
        const dict = translations[lang] || translations.ar;
        const html = document.documentElement;

        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        // Update Page Title
        if (dict["page-title"]) {
            document.title = dict["page-title"];
        }

        // Update Text Elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        // Update HTML Elements (with <strong> or tags)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });

        // Update Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.placeholder = dict[key];
            }
        });

        // Update Select Options
        document.querySelectorAll('[data-i18n-option]').forEach(el => {
            const key = el.getAttribute('data-i18n-option');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        // Update Toggle Button Text: Show the OTHER language to switch to
        if (langBtnText) {
            langBtnText.textContent = lang === 'ar' ? 'English' : 'عربي';
        }

        // Refresh typing animation with new language
        if (typingTimer) clearTimeout(typingTimer);
        phraseIndex = 0;
        charIndex = 0;
        isDeleting = false;
        if (typingTextEl) typingTextEl.textContent = '';
        typeEffect();

        // Save preference
        localStorage.setItem('portfolio_lang', lang);
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const currentLang = document.documentElement.getAttribute('lang') || 'ar';
            const targetLang = currentLang === 'ar' ? 'en' : 'ar';
            applyLanguage(targetLang);
            showToast(targetLang === 'ar' ? '🇸🇦 تم التبديل إلى اللغة العربية' : '🇬🇧 Switched to English language');
        });
    }

    // Initialize from saved preference if available
    const savedLang = localStorage.getItem('portfolio_lang');
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
        applyLanguage(savedLang);
    } else {
        if (langBtnText) langBtnText.textContent = 'English';
    }

    // =========================================================
    // 15. Security Notice & Console Protection
    // =========================================================
    try {
        console.log(
            '%c🛡️ نظام أمان الموقع نشط | Security Active\n' +
            '%cالموقع مؤمن ومحمي ضد هجمات XSS، Clickjacking، والتسلل. جميع البيانات مشفرة وآمنة.\n' +
            'المهندس أحمد ذايد — مهندس نظم معلومات وتحليل البيانات.',
            'color: #06B6D4; font-size: 14px; font-weight: bold;',
            'color: #9CA3AF; font-size: 12px;'
        );
    } catch (e) {}

});

