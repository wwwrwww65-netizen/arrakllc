/* ============================================================
   ARRAK LLC - Advanced Animations Engine
   ============================================================ */

(function () {
  'use strict';

  // ─── 1. SCROLL PROGRESS BAR ───────────────────────────────
  const progressBar = document.getElementById('scrollProgressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  // ─── 2. HEADER SCROLL SHRINK ───────────────────────────────
  const header = document.getElementById('mainHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('header-scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ─── 3. FLOATING PARTICLES SYSTEM ──────────────────────────
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const colors = ['rgba(92,36,255,', 'rgba(0,225,255,', 'rgba(236,72,153,', 'rgba(16,185,129,'];
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      p.className = 'particle-dot';
      const size = Math.random() * 4 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = Math.random() * 0.5 + 0.2;
      const duration = Math.random() * 14 + 8;
      const delay = Math.random() * 10;
      p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;bottom:-${size}px;background:radial-gradient(circle,${color}${opacity}) 0%,transparent 70%);animation:particle-rise ${duration}s ${delay}s infinite ease-in;`;
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
      current = (index + slides.length) % slides.length;
      const slideWidth = slides[0].offsetWidth + 15;
      slider.scrollTo({ left: current * slideWidth, behavior: 'smooth' });
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
          valEl.classList.add('flip-anim');
          valEl.textContent = newVal;
          setTimeout(() => valEl.classList.remove('flip-anim'), 400);
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
      spark.className = 'logo-spark';
      spark.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;`;
      logoShimmer.appendChild(spark);
      setTimeout(() => spark.remove(), 700);
    }, 500);
  }

  // ═══════════════════════════════════════════════════════════
  // ─── 10. MOBILE TOUCH HOVER SYSTEM ────────────────────────
  //  يُشغّل تأثير hover فور لمس العنصر، ويُلغيه عند التمرير
  // ═══════════════════════════════════════════════════════════
  if (window.matchMedia('(pointer: coarse)').matches) {

    const TOUCH_SELECTORS = [
      '.product-card',
      '.game-sq',
      '.category-item-sq',
      '.inst-game-card',
      '.add-to-cart-btn',
      '.btn-animated',
      '.nav-item',
      '.sm-link',
      '.social-links a',
    ];

    let touchY0 = 0, touchX0 = 0;
    let didScroll = false;
    let activeEl = null;
    let clearTimer = null;

    function applyHover(el) {
      if (activeEl && activeEl !== el) removeHover(activeEl);
      el.classList.add('touch-hover');
      activeEl = el;
    }

    function removeHover(el) {
      if (!el) return;
      el.classList.remove('touch-hover');
      if (activeEl === el) activeEl = null;
    }

    const allTargets = document.querySelectorAll(TOUCH_SELECTORS.join(','));

    allTargets.forEach(el => {
      el.addEventListener('touchstart', (e) => {
        touchY0 = e.touches[0].clientY;
        touchX0 = e.touches[0].clientX;
        didScroll = false;
        clearTimeout(clearTimer);
        applyHover(el);
      }, { passive: true });

      el.addEventListener('touchmove', (e) => {
        if (
          Math.abs(e.touches[0].clientY - touchY0) > 8 ||
          Math.abs(e.touches[0].clientX - touchX0) > 8
        ) {
          didScroll = true;
          removeHover(el);
        }
      }, { passive: true });

      el.addEventListener('touchend', () => {
        if (didScroll) {
          removeHover(el);
        } else {
          clearTimer = setTimeout(() => removeHover(el), 300);
        }
      }, { passive: true });

      el.addEventListener('touchcancel', () => removeHover(el), { passive: true });
    });

    // أزل أي hover نشط عند التمرير
    window.addEventListener('scroll', () => {
      if (activeEl) removeHover(activeEl);
    }, { passive: true });
  }

})();
