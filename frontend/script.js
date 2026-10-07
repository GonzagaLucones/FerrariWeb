(() => {
  const canvas = document.getElementById('animation-canvas');
  const video = document.getElementById('animation-video');

  if (!canvas && !video) return;

  const ctx = canvas
    ? canvas.getContext('2d', { alpha: false })
    : null;

  const MOBILE_BREAKPOINT = 768;
  const TOTAL_FRAMES = 300;

  const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

  // ==============================
  // DESKTOP FRAME SYSTEM
  // ==============================

  const frames = new Array(TOTAL_FRAMES);
let framesLoaded = 0;
let framesStarted = false;

let targetFrame = 0;
let currentFrame = -1;

function framePath(index) {
  const number = String(index + 1).padStart(3, '0');

  if (isMobile()) {
    return `frames-mobile/ezgif-frame-${number}.jpg`;
  }

  return `frames/frame_${number}.jpg`;
  }

  function preloadFrames() {
    if (framesStarted) return;

    framesStarted = true;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();

      img.decoding = 'async';

      if (i === 0) {
        img.fetchPriority = 'high';
      }

      img.onload = () => {
        frames[i] = img;
        framesLoaded++;

        // Mostra o primeiro frame assim que estiver disponível
        if (i === 0 && !isMobile()) {
          drawFrame(0);
        }
      };

      img.onerror = () => {
        console.warn(`Erro ao carregar ${framePath(i)}`);
      };

      img.src = framePath(i);
    }
  }

  function resizeCanvas() {
    if (!canvas || !ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (currentFrame >= 0 && frames[currentFrame]) {
      drawFrame(currentFrame);
    }
  }

  function drawFrame(index) {
    if (!canvas || !ctx) return;

    const frame = frames[index];

    if (!frame || !frame.complete || !frame.naturalWidth) {
      return;
    }

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    const imageWidth = frame.naturalWidth;
    const imageHeight = frame.naturalHeight;

    // Equivalente ao object-fit: cover
    const scale = Math.max(
      canvasWidth / imageWidth,
      canvasHeight / imageHeight
    );

    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;

    const offsetX = (canvasWidth - drawWidth) / 2;
    const offsetY = (canvasHeight - drawHeight) / 2;

    ctx.clearRect(
      0,
      0,
      canvasWidth,
      canvasHeight
    );

    ctx.drawImage(
      frame,
      offsetX,
      offsetY,
      drawWidth,
      drawHeight
    );

    currentFrame = index;
  }

  function updateTargetFrame(progress) {
    targetFrame = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(
        0,
        Math.floor(
          progress * (TOTAL_FRAMES - 1)
        )
      )
    );
  }

  function drawTargetFrame() {
    if (isMobile()) return;

    if (targetFrame === currentFrame) return;

    // Se o frame exato ainda não carregou,
    // procura o frame mais próximo que já carregou.
    if (frames[targetFrame]) {
      drawFrame(targetFrame);
      return;
    }

    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const previous = targetFrame - offset;

      if (previous >= 0 && frames[previous]) {
        drawFrame(previous);
        return;
      }

      const next = targetFrame + offset;

      if (next < TOTAL_FRAMES && frames[next]) {
        drawFrame(next);
        return;
      }
    }
  }

  // ==============================
  // MOBILE VIDEO SYSTEM
  // ==============================

  let currentSource = '';
  let targetTime = 0;
  let currentTime = 0;

  function setVideoSource() {
    if (!video) return;

    const source = 'videos/1005.mp4';

    if (source === currentSource) return;

    currentSource = source;

    video.src = source;
    video.load();
    
    video.muted = true;
    video.playsInline = true;
    
    video.addEventListener(
      'loadedmetadata',
      () => {
        video.currentTime = 0;
        currentTime = 0;
        targetTime = 0;

        updateScrollTarget();

        video.currentTime = 0;
        video.play().catch(() => {});
        video.pause();
      },
      { once: true }
    );
  }

  // ==============================
  // VISIBILITY / MODE
  // ==============================

  function updateAnimationMode() {
    const mobile = isMobile();

    if (canvas) {
      canvas.style.display = mobile
        ? 'none'
        : 'block';
    }

    if (video) {
      video.style.display = mobile
        ? 'block'
        : 'none';
    }

    if (mobile) {
      setVideoSource();
    } else {
      preloadFrames();
      resizeCanvas();
    }
  }

  // ==============================
  // SCROLL
  // ==============================

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

    const winHeight =
      window.innerHeight || 1;

    const maxScroll =
      docHeight - winHeight;

    if (maxScroll <= 0) return 0;

    return Math.min(
      Math.max(
        scrollTop / maxScroll,
        0
      ),
      1
    );
  }

  function updateScrollTarget() {
    const progress =
      getScrollFraction();

    // ==========================
    // ANIMAÇÃO PRINCIPAL
    // ==========================

    if (isMobile()) {
      if (
        video &&
        video.duration &&
        Number.isFinite(video.duration)
      ) {
        targetTime =
          progress * video.duration;
      }
    } else {
      updateTargetFrame(progress);
    }

    // ==========================
    // HEADER
    // ==========================

    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0;

    const siteHeader =
      document.getElementById('site-header');

    if (siteHeader) {
      if (scrollTop > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // ==========================
    // HERO PARALLAX
    // ==========================

    const heroContent =
      document.querySelector('.hero-content');

    if (heroContent) {
      const heroFadeThreshold =
        window.innerHeight * 0.85;

      if (
        scrollTop <
        heroFadeThreshold
      ) {
        const factor =
          scrollTop /
          heroFadeThreshold;

        heroContent.style.opacity =
          String(
            Math.max(
              0,
              1 - factor * 1.3
            )
          );

        heroContent.style.transform =
          `translateY(${-factor * 60}px)`;
      } else {
        heroContent.style.opacity = '0';
      }
    }

    // ==========================
    // SHOWCASE
    // ==========================

    const showcaseContent =
      document.querySelector(
        '.showcase-content'
      );

    if (showcaseContent) {
      if (
        progress >= 0.16 &&
        progress <= 0.52
      ) {
        showcaseContent.classList.add(
          'active'
        );
      } else {
        showcaseContent.classList.remove(
          'active'
        );
      }
    }
  }

  // ==============================
  // ANIMATION LOOP
  // ==============================

  function animationLoop() {
    if (isMobile()) {
      // Mobile continua usando o vídeo
      if (
        video &&
        video.readyState >= 2 &&
        Number.isFinite(currentTime)
      ) {
        if (Math.abs(video.currentTime - targetTime) > 0.01) {
  try {
    video.currentTime = targetTime;
  } catch (error) {
    // Ignora seeks temporariamente indisponíveis
  }
}
      }
    } else {
      // Desktop usa os JPGs
      drawTargetFrame();
    }

    requestAnimationFrame(
      animationLoop
    );
  }

  // ==============================
  // SCROLL REVEALS
  // ==============================

  function setupScrollReveals() {
    const revealElements =
      document.querySelectorAll(
        '.reveal-on-scroll'
      );

    if (
      !('IntersectionObserver' in window)
    ) {
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
                entry.target.getAttribute(
                  'data-delay'
                ) || 0;

              setTimeout(() => {
                entry.target.classList.add(
                  'revealed'
                );
              }, Number(delay));
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin:
            '0px 0px -40px 0px'
        }
      );

    revealElements.forEach(el =>
      observer.observe(el)
    );
  }

  // ==============================
  // MENU DRAWER
  // ==============================

  function setupMenuDrawer() {
    const openBtn =
      document.getElementById(
        'menu-open-btn'
      );

    const closeBtn =
      document.getElementById(
        'menu-close-btn'
      );

    const drawer =
      document.getElementById(
        'menu-drawer'
      );

    const backdrop =
      document.getElementById(
        'menu-backdrop'
      );

    const navLinks =
      document.querySelectorAll(
        '[data-close-drawer]'
      );

    function openMenu() {
      if (!drawer) return;

      drawer.classList.add('open');
      drawer.setAttribute(
        'aria-hidden',
        'false'
      );

      document.body.style.overflow =
        'hidden';
    }

    function closeMenu() {
      if (!drawer) return;

      drawer.classList.remove('open');

      drawer.setAttribute(
        'aria-hidden',
        'true'
      );

      document.body.style.overflow = '';
    }

    if (openBtn) {
      openBtn.addEventListener(
        'click',
        openMenu
      );
    }

    if (closeBtn) {
      closeBtn.addEventListener(
        'click',
        closeMenu
      );
    }

    if (backdrop) {
      backdrop.addEventListener(
        'click',
        closeMenu
      );
    }

    navLinks.forEach(link => {
      link.addEventListener(
        'click',
        closeMenu
      );
    });

    window.addEventListener(
      'keydown',
      e => {
        if (
          e.key === 'Escape' &&
          drawer &&
          drawer.classList.contains(
            'open'
          )
        ) {
          closeMenu();
        }
      }
    );
  }

  // ==============================
  // INIT
  // ==============================

  function init() {
    updateAnimationMode();
    updateScrollTarget();

    window.addEventListener(
      'resize',
      () => {
        updateAnimationMode();
        updateScrollTarget();
      }
    );

    window.addEventListener(
      'scroll',
      updateScrollTarget,
      { passive: true }
    );

    if (video) {
      video.addEventListener(
        'loadedmetadata',
        updateScrollTarget
      );
    }

    requestAnimationFrame(
      animationLoop
    );

    setupScrollReveals();
    setupMenuDrawer();
  }

  if (
    document.readyState ===
    'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      init
    );
  } else {
    init();
  }
})();
