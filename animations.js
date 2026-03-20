/* ============================================================
   ARRAK LLC - Advanced Animations Engine
   ============================================================ */

(function () {
  'use strict';

  // ─── 1. SCROLL PROGRESS BAR & HEADER ──────────────────────
  const progressBar = document.getElementById('scrollProgressBar');
  const header = document.getElementById('mainHeader');
  let scrollRAF = false;

  window.addEventListener('scroll', () => {
    if (!scrollRAF) {
      window.requestAnimationFrame(() => {
        const scrollTop = document.documentElement.scrollTop;
        if (progressBar) {
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const progress = (scrollTop / scrollHeight) * 100;
          progressBar.style.width = progress + '%';
        }
        if (header) {
          header.classList.toggle('header-scrolled', scrollTop > 60);
        }
        scrollRAF = false;
      });
      scrollRAF = true;
    }
  }, { passive: true });

  // ─── 3. CRYSTAL BUBBLES SYSTEM ──────────────────────────
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const colors = ['rgba(92,36,255,', 'rgba(0,225,255,', 'rgba(236,72,153,', 'rgba(16,185,129,'];
    // تقليل عدد الفقاعات إلى 12 لمنع الازدحام
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'particle-dot';
      const size = Math.random() * 18 + 8; // 8px to 26px
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = Math.random() * 0.4 + 0.1;
      const duration = Math.random() * 15 + 10;
      // استخدام delay بالسالب يضمن أن المتصفح قد "بدأ" الأنيمشن مسبقاً بفترات متفاوتة، فتتوزع كحلقة لانهائية متكاملة بلا دفعات مقطوعة
      const delay = -(Math.random() * 30);
      
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random()*100}%;
        bottom: -${size + 20}px;
        background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
        box-shadow: inset -2px -2px 6px rgba(0,0,0,0.2), inset 2px 2px 6px rgba(255,255,255,0.5), 0 0 10px ${color}${opacity});
        border: 1px solid rgba(255,255,255,0.15);
        animation: particle-rise ${duration}s ${delay}s infinite ease-in-out;
        will-change: transform;
        pointer-events: none;
      `;
      canvas.appendChild(p);
    }
  }

  // ─── 4. AUTO BANNER SLIDER ─────────────────────────────────
  const slider = document.getElementById('bannerSlider');
  const dots = document.querySelectorAll('.dot');
  if (slider && dots.length) {
    const slides = slider.querySelectorAll('.banner-slide');
    let current = 0;
    let autoTimer;

    function goTo(index) {
      if (document.hidden) return; // Don't animate when tab is inactive
      current = (index + slides.length) % slides.length;
      
      const targetSlide = slides[current];
      const targetCenter = targetSlide.getBoundingClientRect().left + (targetSlide.offsetWidth / 2);
      const sliderCenter = slider.getBoundingClientRect().left + (slider.offsetWidth / 2);
      
      slider.scrollBy({ left: targetCenter - sliderCenter, behavior: 'smooth' });
      
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 5000);
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => { clearInterval(autoTimer); goTo(idx); startAuto(); });
    });

    slider.addEventListener('touchstart', () => clearInterval(autoTimer), { passive: true });
    slider.addEventListener('touchend', () => startAuto(), { passive: true });
    slider.addEventListener('touchcancel', () => startAuto(), { passive: true });

    startAuto();
  }

  // ─── 5. LIVE COUNTDOWN TIMER ──────────────────────────────
  (function startCountdown() {
    const target = new Date();
    target.setDate(target.getDate() + 1);
    target.setHours(20, 41, 38, 0);
    const boxes = document.querySelectorAll('.time-box');
    if (!boxes.length) return;

    function update() {
      const diff = target - new Date();
      if (diff <= 0) return;
      const vals = [
        Math.floor(diff / 86400000),
        Math.floor((diff % 86400000) / 3600000),
        Math.floor((diff % 3600000) / 60000),
        Math.floor((diff % 60000) / 1000)
      ];
      boxes.forEach((box, i) => {
        const valEl = box.querySelector('.time-val');
        const newVal = String(vals[i]).padStart(2, '0');
        if (valEl && valEl.textContent !== newVal) {
          valEl.textContent = newVal;
        }
      });
    }
    update();
    setInterval(update, 1000);
  })();

  // ─── 6. SCROLL REVEAL ─────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal-section').forEach(el => revealObserver.observe(el));

  // Staggered cards reveal
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.product-card, .game-sq, .inst-game-card').forEach((card, i) => {
          setTimeout(() => card.classList.add('card-revealed'), i * 80);
        });
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  document.querySelectorAll('.products-grid, .games-grid-3x3, .installments-games-scroll').forEach(g => cardObserver.observe(g));

  // Categories stagger
  const catObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.category-item-sq').forEach((item, i) => {
          setTimeout(() => item.classList.add('cat-revealed'), i * 60);
        });
        catObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.h-scroll-container').forEach(c => catObserver.observe(c));

  // ─── 7. PARALLAX on BANNER ORBS ───────────────────────────
  const orbs = document.querySelectorAll('.banner-floating-orb');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    orbs.forEach((orb, i) => { orb.style.transform = `translateY(${scrollY * (0.08 + i * 0.04)}px)`; });
  }, { passive: true });

  // ─── 8. DESKTOP-ONLY FEATURES ─────────────────────────────
  if (window.matchMedia('(pointer: fine)').matches) {
    // Magnetic buttons
    document.querySelectorAll('.btn-animated, .add-to-cart-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width/2) * 0.15}px, ${(e.clientY - r.top - r.height/2) * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });

    // Cursor glow
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    (function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    })();
    document.querySelectorAll('a, button, .product-card, .game-sq, .category-item-sq').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    // 3D Tilt on product cards
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.transform = `translateY(-8px) perspective(600px) rotateX(${(y-0.5)*-8}deg) rotateY(${(x-0.5)*8}deg)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  // ─── 9. SPARKLE on Logo ───────────────────────────────────
  const logoShimmer = document.querySelector('.logo-shimmer');
  if (logoShimmer) {
    setInterval(() => {
      const spark = document.createElement('span');
      spark.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;`;
      logoShimmer.appendChild(spark);
      setTimeout(() => spark.remove(), 700);
    }, 500);
  }

  // ─── 10. MOBILE GLIDE HOVER ──────────────────────────────
  // يحاكي تأثير الماوس تماماً عند تمرير الإصبع على الهاتف
  if (window.matchMedia('(pointer: coarse)').matches) {
    let activeEl = null;
    let fallbackTimer = null;
    let scrollTicking = false;
    let isTouching = false;

    const HOVER_SELECTORS = '.product-card, .game-sq, .category-item-sq, .inst-game-card, .btn-animated, .nav-item, .add-to-cart-btn';

    function runTouchHover(x, y) {
      const el = document.elementFromPoint(x, y);
      const target = el ? el.closest(HOVER_SELECTORS) : null;
      
      if (activeEl !== target) {
        if (activeEl) activeEl.classList.remove('touch-hover');
        if (target) target.classList.add('touch-hover');
        activeEl = target;
      }
    }

    function cancelTouch() {
      if (activeEl) {
        activeEl.classList.remove('touch-hover');
        activeEl = null;
      }
    }

    document.addEventListener('touchstart', (e) => {
      isTouching = true;
      clearTimeout(fallbackTimer);
      runTouchHover(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    let lastTouchTime = 0;
    document.addEventListener('touchmove', (e) => {
      const now = Date.now();
      // Throttle heavy DOM lookups to 40ms to keep 60fps scrolling perfectly smooth
      if (now - lastTouchTime > 40 && !scrollTicking) {
        window.requestAnimationFrame(() => {
          runTouchHover(e.touches[0].clientX, e.touches[0].clientY);
          scrollTicking = false;
        });
        scrollTicking = true;
        lastTouchTime = now;
      }
    }, { passive: true });

    document.addEventListener('touchend', () => {
      isTouching = false;
      clearTimeout(fallbackTimer);
      fallbackTimer = setTimeout(cancelTouch, 400); // إبقاء التأثير قليلاً بعد الرفع
    }, { passive: true });
    
    document.addEventListener('touchcancel', () => {
      isTouching = false;
      cancelTouch();
    }, { passive: true });

    window.addEventListener('scroll', () => {
      if (!isTouching) {
        cancelTouch();
      }
    }, { passive: true });
  }

})();
