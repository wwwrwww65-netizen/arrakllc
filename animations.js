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
      if (window.scrollY > 60) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }, { passive: true });
  }

  // ─── 3. FLOATING PARTICLES SYSTEM ──────────────────────────
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const colors = ['rgba(92,36,255,', 'rgba(0,225,255,', 'rgba(236,72,153,', 'rgba(16,185,129,'];
    const count = 28;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle-dot';
      const size = Math.random() * 4 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = Math.random() * 0.5 + 0.2;
      const duration = Math.random() * 14 + 8;
      const delay = Math.random() * 10;
      const x = Math.random() * 100;

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        bottom: -${size}px;
        background: radial-gradient(circle, ${color}${opacity}) 0%, transparent 70%);
        animation: particle-rise ${duration}s ${delay}s infinite ease-in;
        animation-delay: ${delay}s;
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
      current = (index + slides.length) % slides.length;
      const slideWidth = slides[0].offsetWidth + 15; // gap
      slider.scrollTo({ left: current * slideWidth, behavior: 'smooth' });
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 3800);
    }

    // Dot click
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        clearInterval(autoTimer);
        goTo(idx);
        startAuto();
      });
    });

    // Touch/drag pause
    slider.addEventListener('touchstart', () => clearInterval(autoTimer), { passive: true });
    slider.addEventListener('touchend', () => startAuto(), { passive: true });

    startAuto();
  }

  // ─── 5. LIVE COUNTDOWN TIMER ──────────────────────────────
  function startCountdown() {
    const now = new Date();
    const target = new Date(now);
    target.setDate(target.getDate() + 1);
    target.setHours(20, 41, 38, 0);

    const boxes = document.querySelectorAll('.time-box');
    if (!boxes.length) return;

    function update() {
      const diff = target - new Date();
      if (diff <= 0) return;

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      const vals = [d, h, m, s];
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
  }

  startCountdown();

  // ─── 6. SCROLL REVEAL (Intersection Observer) ─────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-section').forEach(el => {
    revealObserver.observe(el);
  });

  // Staggered product cards reveal
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.product-card, .game-sq, .inst-game-card');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('card-revealed');
          }, i * 80);
        });
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.products-grid, .games-grid-3x3, .installments-games-scroll').forEach(grid => {
    cardObserver.observe(grid);
  });

  // ─── 7. CATEGORY ITEMS STAGGER ────────────────────────────
  const catObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.category-item-sq');
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add('cat-revealed'), i * 60);
        });
        catObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.h-scroll-container').forEach(c => catObserver.observe(c));

  // ─── 8. MAGNETIC HOVER on BUTTONS ─────────────────────────
  document.querySelectorAll('.btn-animated, .add-to-cart-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ─── 9. PARALLAX on BANNER ORBS ───────────────────────────
  const orbs = document.querySelectorAll('.banner-floating-orb');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = 0.08 + i * 0.04;
      orb.style.transform = `translateY(${scrollY * speed}px) scale(1)`;
    });
  }, { passive: true });

  // ─── 10. CURSOR GLOW (Desktop only) ───────────────────────
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Grow on interactive elements
    document.querySelectorAll('a, button, .product-card, .game-sq, .category-item-sq').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
  }

  // ─── 11. SPARKLE EFFECT on Logo ───────────────────────────
  const logoShimmer = document.querySelector('.logo-shimmer');
  if (logoShimmer) {
    setInterval(() => {
      const spark = document.createElement('span');
      spark.className = 'logo-spark';
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      spark.style.cssText = `left:${x}%;top:${y}%;`;
      logoShimmer.appendChild(spark);
      setTimeout(() => spark.remove(), 700);
    }, 500);
  }

  // ─── 12. TILT EFFECT on Product Cards ─────────────────────
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -8;
      const rotateY = (x - 0.5) * 8;
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

})();
