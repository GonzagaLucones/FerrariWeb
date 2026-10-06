(() => {
  const video = document.getElementById('animation-video');

  if (!video) return;

  const MOBILE_BREAKPOINT = 768;

  const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

  function getVideoSource() {
    return isMobile()
      ? 'videos/1005.mp4'
      : 'videos/upscaled-video.mp4';
  }

  let currentSource = '';
  let targetTime = 0;
  let currentTime = 0;

  const LERP_FACTOR = 0.35;

  function setVideoSource() {
    const source = getVideoSource();

    if (source === currentSource) return;

    currentSource = source;

    video.src = source;
    video.load();

    video.addEventListener(
      'loadedmetadata',
      () => {
        video.currentTime = 0;
        currentTime = 0;
        targetTime = 0;
      },
      { once: true }
    );
  }

  function getScrollFraction() {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0;

    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.offsetHeight
    );

    const winHeight = window.innerHeight || 1;

    const maxScroll = docHeight - winHeight;

    if (maxScroll <= 0) return 0;

    return Math.min(
      Math.max(scrollTop / maxScroll, 0),
      1
    );
  }

  function updateScrollTarget() {
    const progress = getScrollFraction();

    if (video.duration && Number.isFinite(video.duration)) {
      targetTime = progress * video.duration;
    }

    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0;

    // Header
    const siteHeader =
      document.getElementById('site-header');

    if (siteHeader) {
      if (scrollTop > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Hero parallax
    const heroContent =
      document.querySelector('.hero-content');

    if (heroContent) {
      const heroFadeThreshold =
        window.innerHeight * 0.85;

      if (scrollTop < heroFadeThreshold) {
        const factor =
          scrollTop / heroFadeThreshold;

        heroContent.style.opacity =
          String(Math.max(0, 1 - factor * 1.3));

        heroContent.style.transform =
          `translateY(${-factor * 60}px)`;
      } else {
        heroContent.style.opacity = '0';
      }
    }

    // Showcase
    const showcaseContent =
      document.querySelector('.showcase-content');

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

    currentTime = targetTime;

    if (
      video.readyState >= 2 &&
      Number.isFinite(currentTime)
    ) {
      try {
        video.currentTime = currentTime;
      } catch (error) {
        // Ignore temporary seeking errors while metadata loads.
      }
    }

    requestAnimationFrame(animationLoop);
  }

  // Scroll Reveal Observer
  function setupScrollReveals() {
    const revealElements =
      document.querySelectorAll('.reveal-on-scroll');

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el =>
        el.classList.add('revealed')
      );

      return;
    }

    const observer =
      new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const delay =
                entry.target.getAttribute('data-delay') || 0;

              setTimeout(() => {
                entry.target.classList.add('revealed');
              }, Number(delay));
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -40px 0px'
        }
      );

    revealElements.forEach(el =>
      observer.observe(el)
    );
  }

  // Menu Drawer
  function setupMenuDrawer() {
    const openBtn =
      document.getElementById('menu-open-btn');

    const closeBtn =
      document.getElementById('menu-close-btn');

    const drawer =
      document.getElementById('menu-drawer');

    const backdrop =
      document.getElementById('menu-backdrop');

    const navLinks =
      document.querySelectorAll('[data-close-drawer]');

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

    if (openBtn) {
      openBtn.addEventListener('click', openMenu);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', e => {
      if (
        e.key === 'Escape' &&
        drawer &&
        drawer.classList.contains('open')
      ) {
        closeMenu();
      }
    });
  }

  function init() {
    setVideoSource();

    window.addEventListener(
      'resize',
      () => {
        setVideoSource();
      }
    );

    window.addEventListener(
      'scroll',
      updateScrollTarget,
      { passive: true }
    );

    window.addEventListener(
      'wheel',
      updateScrollTarget,
      { passive: true }
    );

    window.addEventListener(
      'touchmove',
      updateScrollTarget,
      { passive: true }
    );

    video.addEventListener(
      'loadedmetadata',
      updateScrollTarget
    );

    updateScrollTarget();

    requestAnimationFrame(animationLoop);

    setupScrollReveals();
    setupMenuDrawer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      init
    );
  } else {
    init();
  }
})();
