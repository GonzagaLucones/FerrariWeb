(() => {
  const TOTAL_FRAMES = 300;
  const canvas = document.getElementById('animation-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: false });

  // Store preloaded Image objects (1-indexed)
  const frames = new Array(TOTAL_FRAMES + 1);

  let currentFrame = 1;
  let targetFrame = 1;
  let lastDrawnImage = null;
  let needsResize = true;

  // Inertial smoothing interpolation factor (0.11 gives instant yet buttery response)
  const LERP_FACTOR = 0.11;

  function getFramePath(index) {
    const pad = String(index).padStart(3, '0');
    return `frames/frame_${pad}.jpg`;
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    const targetWidth = Math.round(width * dpr);
    const targetHeight = Math.round(height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      needsResize = true;
    }
  }

  function drawImageCover(img) {
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  const isMobile = window.innerWidth <= 768;

  // Desktop: mantém exatamente o comportamento original.
  // Mobile: prioriza a largura para evitar que a composição
  // seja ampliada excessivamente pela altura da tela.
  const scale = isMobile
    ? cw / iw
    : Math.max(cw / iw, ch / ih);

  const nw = iw * scale;
  const nh = ih * scale;

  const cx = (cw - nw) / 2;
  const cy = (ch - nh) / 2;

  ctx.drawImage(img, cx, cy, nw, nh);
  }

  function getBestAvailableFrame(index) {
    if (frames[index] && frames[index].complete && frames[index].naturalWidth > 0) {
      return frames[index];
    }
    // Search outward for the nearest loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = index - offset;
      if (prev >= 1 && frames[prev] && frames[prev].complete && frames[prev].naturalWidth > 0) {
        return frames[prev];
      }
      const next = index + offset;
      if (next <= TOTAL_FRAMES && frames[next] && frames[next].complete && frames[next].naturalWidth > 0) {
        return frames[next];
      }
    }
    return frames[1] || null;
  }

  function render(force = false) {
    const frameIndex = Math.min(Math.max(Math.round(currentFrame), 1), TOTAL_FRAMES);
    const img = getBestAvailableFrame(frameIndex);

    if (img && (force || img !== lastDrawnImage || needsResize)) {
      drawImageCover(img);
      lastDrawnImage = img;
      needsResize = false;
    }
  }

  function getScrollFraction() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.offsetHeight
    );
    const winHeight = window.innerHeight || 1;
    const maxScroll = docHeight - winHeight;

    if (maxScroll <= 0) return 0;
    return Math.min(Math.max(scrollTop / maxScroll, 0), 1);
  }

  // Progressive Parallax & UI effects
  const siteHeader = document.getElementById('site-header');
  const heroContent = document.querySelector('.hero-content');
  const showcaseContent = document.querySelector('.showcase-content');

  function updateScrollTarget() {
    const progress = getScrollFraction();
    targetFrame = 1 + progress * (TOTAL_FRAMES - 1);

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;

    // Header scrolled state
    if (siteHeader) {
      if (scrollTop > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Hero content subtle parallax fade
    if (heroContent) {
      const heroFadeThreshold = window.innerHeight * 0.85;
      if (scrollTop < heroFadeThreshold) {
        const factor = scrollTop / heroFadeThreshold;
        heroContent.style.opacity = String(Math.max(0, 1 - factor * 1.3));
        heroContent.style.transform = `translateY(${-factor * 60}px)`;
      } else {
        heroContent.style.opacity = '0';
      }
    }

    // Showcase section reveal during middle scroll (~18% to 50%)
    if (showcaseContent) {
      if (progress >= 0.16 && progress <= 0.52) {
        showcaseContent.classList.add('active');
      } else {
        showcaseContent.classList.remove('active');
      }
    }
  }

  function animationLoop() {
    updateScrollTarget();

    const diff = targetFrame - currentFrame;
    if (Math.abs(diff) > 0.005) {
      currentFrame += diff * LERP_FACTOR;
    } else {
      currentFrame = targetFrame;
    }

    render();
    requestAnimationFrame(animationLoop);
  }

  function loadImage(index) {
    return new Promise((resolve) => {
      if (frames[index]) {
        resolve(frames[index]);
        return;
      }
      const img = new Image();
      img.onload = () => {
        frames[index] = img;
        if (Math.round(currentFrame) === index) {
          render(true);
        }
        resolve(img);
      };
      img.onerror = () => {
        resolve(null);
      };
      img.src = getFramePath(index);
      if (img.complete && img.naturalWidth > 0) {
        frames[index] = img;
        resolve(img);
      }
    });
  }

  function preloadAll() {
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      loadImage(i);
    }
  }

  // Scroll Reveal Observer for Cards and Sections
  function setupScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, Number(delay));
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // Menu Drawer Logic
  function setupMenuDrawer() {
    const openBtn = document.getElementById('menu-open-btn');
    const closeBtn = document.getElementById('menu-close-btn');
    const drawer = document.getElementById('menu-drawer');
    const backdrop = document.getElementById('menu-backdrop');
    const navLinks = document.querySelectorAll('[data-close-drawer]');

    function openMenu() {
      if (!drawer) return;
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      if (!drawer) return;
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  async function init() {
    resizeCanvas();

    window.addEventListener('resize', () => {
      resizeCanvas();
      needsResize = true;
      render(true);
    });

    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('wheel', updateScrollTarget, { passive: true });
    window.addEventListener('touchmove', updateScrollTarget, { passive: true });

    updateScrollTarget();
    currentFrame = targetFrame;

    const initialIndex = Math.min(Math.max(Math.round(currentFrame), 1), TOTAL_FRAMES);

    await loadImage(initialIndex);
    if (initialIndex !== 1) {
      loadImage(1);
    }
    render(true);

    requestAnimationFrame(animationLoop);
    preloadAll();

    setupScrollReveals();
    setupMenuDrawer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
