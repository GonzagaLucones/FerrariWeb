const fs = require('fs');
const path = require('path');

const horsePath = fs.readFileSync(path.join(__dirname, 'horse_path.txt'), 'utf8').trim();

function getHorseSvg(size, className) {
  return `<div class="horse-wrap ${className || ''}" style="width: ${size}px; height: ${Math.round(size * 1.35)}px;">
    <svg role="img" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" aria-label="Ferrari Cavallino Rampante">
      <title>Ferrari Cavallino Rampante</title>
      <path d="${horsePath}" />
    </svg>
  </div>`;
}

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ferrari — Built to be Remembered</title>
  <meta name="description" content="Ferrari. Where engineering becomes emotion. Built with obsession. Driven with purpose. Remembered forever." />
  <meta property="og:title" content="Ferrari — Built to be Remembered" />
  <meta property="og:description" content="Ferrari. Where engineering becomes emotion. Built with obsession. Driven with purpose. Remembered forever." />
  <meta property="og:type" content="website" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css?v=7">
  <link rel="stylesheet" href="chat.css?v=1">
</head>
<body class="bg-black text-white selection:bg-white selection:text-black">
  <h1 class="sr-only">Ferrari — Built to be Remembered</h1>

  <!-- 1. Background Animation Canvas Fixed Layer -->
  <div id="canvas-container" class="canvas-container">
    <canvas id="animation-canvas"></canvas>
    <div class="ambient-gradient-overlay"></div>
  </div>

  <!-- 2. Architectural Guidelines & Crosshair Overlay -->
  <div class="guide-lines-overlay" aria-hidden="true">
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" class="guide-svg">
      <line x1="0" y1="305" x2="1440" y2="305" stroke="#ffffff" stroke-width="0.75" stroke-opacity="0.22" />
      <line x1="1130" y1="0" x2="1130" y2="900" stroke="#ffffff" stroke-width="0.75" stroke-opacity="0.22" />
      <line x1="1285" y1="0" x2="1285" y2="900" stroke="#ffffff" stroke-width="0.5" stroke-opacity="0.14" />
      <g stroke="#ffffff" stroke-width="1" stroke-opacity="0.85">
        <line x1="1116" y1="305" x2="1144" y2="305" />
        <line x1="1130" y1="291" x2="1130" y2="319" />
        <circle cx="1130" cy="305" r="1.5" fill="#ffffff" />
      </g>
    </svg>
  </div>

  <!-- 3. Fixed Top Header Bar -->
  <header id="site-header" class="site-header">
    <div class="header-inner">
      <!-- Left: Prancing Horse Logo -->
      <a href="#hero-section" class="horse-link" aria-label="Ferrari Home">
        ${getHorseSvg(38, 'header-horse')}
      </a>

      <!-- Center: F E R R A R I -->
      <div class="header-logo" aria-label="FERRARI">
        <span>F E R R A R I</span>
      </div>

      <!-- Right: Hamburger Menu Button -->
      <div class="header-menu-btn-wrap">
        <button id="menu-open-btn" class="menu-open-btn" aria-label="Open Navigation Menu">
          <span class="bar bar-top"></span>
          <span class="bar bar-bottom"></span>
        </button>
      </div>
    </div>
  </header>

  <!-- 4. Fixed Side Social Icons -->
  <aside class="side-social" aria-label="Social media links">
    <a href="https://facebook.com/Ferrari" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="social-link" title="Facebook">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5c0-.988.245-1.49 1.5-1.49h2.5V2.14C16.85 2.09 15.65 2 14.35 2 10.95 2 8.698 4.07 8.698 7.89v2.62H5.5v3.98h3.198v7.01z" />
      </svg>
    </a>
    <a href="https://instagram.com/Ferrari" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-link" title="Instagram">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke-width="2.5" />
      </svg>
    </a>
    <a href="https://twitter.com/Ferrari" target="_blank" rel="noopener noreferrer" aria-label="Twitter" class="social-link" title="Twitter">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.18 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
      </svg>
    </a>
  </aside>

  <!-- 5. Slide-out Navigation Drawer Modal -->
  <div id="menu-drawer" class="menu-drawer" aria-hidden="true" role="dialog" aria-modal="true">
    <div class="menu-backdrop" id="menu-backdrop"></div>
    <div class="menu-panel">
      <div class="menu-panel-header">
        <span class="menu-subhead">Ferrari Maranello</span>
        <button id="menu-close-btn" class="menu-close-btn" aria-label="Close menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <nav class="menu-nav">
        <a href="#hero-section" class="menu-nav-link" data-close-drawer>
          <span>01. Built to be Remembered</span>
          <span class="menu-link-tag">Hero</span>
        </a>
        <a href="#showcase-section" class="menu-nav-link" data-close-drawer>
          <span>02. The Art of Motion</span>
          <span class="menu-link-tag">Motion</span>
        </a>
        <a href="#second-fold" class="menu-nav-link" data-close-drawer>
          <span>03. Performance & Purpose</span>
          <span class="menu-link-tag">Vision</span>
        </a>
        <a href="#second-fold" class="menu-nav-link" data-close-drawer>
          <span>04. Beyond the Road</span>
          <span class="menu-link-tag">Destiny</span>
        </a>
      </nav>

      <div class="menu-quote">
        <p>
          "There is a moment when engineering stops being numbers and becomes emotion. The sound. The response. The acceleration. The feeling of control. That moment is Ferrari."
        </p>
      </div>

      <div class="menu-panel-footer">
        <span>LAT 44.5326° N</span>
        <span>LONG 10.8644° E</span>
      </div>
    </div>
  </div>

  <!-- 6. Main Interactive Scroll Container -->
  <main id="main-scroll-track" class="main-scroll-track">
    <!-- SECTION 1: HERO FOLD -->
    <section id="hero-section" class="scroll-section hero-section">
      <div class="hero-content">
        <div class="hero-kicker-wrap">
          <span class="hero-kicker">BUILT TO BE REMEMBERED.</span>
        </div>

        <div class="hero-title-wrap">
          <h2 class="hero-title">ferrari</h2>
        </div>

        <div class="hero-desc-wrap">
          <p class="hero-desc">
            <span class="desc-line block">Some dreams are meant to be chased.</span>
            <span class="desc-line block">Others are meant to be driven.</span>
            <span class="desc-line block mt-1"><strong class="font-semibold text-white">Ferrari.</strong> Where engineering becomes emotion.</span>
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 2: MOTION SHOWCASE (Cinematic Mid-fold) -->
    <section id="showcase-section" class="scroll-section showcase-section">
      <div class="showcase-content">
        <span class="showcase-kicker">MARANELLO · ITALIA</span>
        <h3 class="showcase-title">WHERE OBSESSION MEETS SPEED</h3>
        <p class="showcase-desc">Every curve has a purpose. Every detail serves a function. Every movement is engineered with intention.</p>
      </div>
    </section>

    <!-- SECTION 3: SECOND FOLD (Cards & Purpose) -->
    <section id="second-fold" class="scroll-section second-fold-section">
      <div class="second-fold-inner">
        <!-- Kicker -->
        <div class="section-kicker-wrap reveal-on-scroll">
          <span class="section-kicker">THE PURSUIT OF SOMETHING GREATER</span>
        </div>

        <!-- Headline -->
        <div class="section-headline-wrap reveal-on-scroll">
          <h2 class="section-headline">WHEN PERFORMANCE BECOMES PURPOSE.</h2>
        </div>

        <!-- Subtitle -->
        <div class="section-subtitle-wrap reveal-on-scroll">
          <p class="section-subtitle">
            A Ferrari is not simply built to move. It is built to make you feel.
            Years of engineering, thousands of decisions, and an uncompromising obsession with perfection
            come together in one singular experience.
            <br />
            Because the road is not where the journey ends. It is where it begins.
          </p>
        </div>

        <!-- 4 Feature Cards Grid -->
        <div class="cards-grid">
          <!-- Card 01 -->
          <div class="feature-card group reveal-on-scroll" data-delay="0">
            <div class="card-text-top">
              <h3 class="card-title">The Art of Motion</h3>
              <p class="card-desc">
                There is a moment when engineering stops being numbers and becomes emotion. The sound. The response. The acceleration. The feeling of control. That moment is Ferrari.
              </p>
            </div>
            <div class="card-bottom">
              <span class="card-num">01</span>
            </div>
          </div>

          <!-- Card 02 -->
          <div class="feature-card group reveal-on-scroll" data-delay="100">
            <div class="card-text-top">
              <h3 class="card-title">Nothing is Accidental</h3>
              <p class="card-desc">
                Power without control is noise. Speed without precision is meaningless. True performance is the harmony between the two. Every curve has a purpose. Every detail serves a function. Every movement is engineered with intention.
              </p>
            </div>
            <div class="card-bottom">
              <span class="card-num">02</span>
            </div>
          </div>

          <!-- Card 03 -->
          <div class="feature-card group reveal-on-scroll" data-delay="200">
            <div class="card-text-top">
              <h3 class="card-title">Beyond the Road</h3>
              <p class="card-desc">
                There are cars that take you somewhere. And then there are cars that remind you why you wanted to go there in the first place. A Ferrari is not about arriving. It is about becoming.
              </p>
            </div>
            <div class="card-bottom">
              <span class="card-num">03</span>
            </div>
          </div>

          <!-- Card 04 -->
          <div class="feature-card group reveal-on-scroll" data-delay="300">
            <div class="card-text-top">
              <h3 class="card-title">Drive the Dream</h3>
              <p class="card-desc">
                Drive the dream. Leave the mark. Built with obsession. Driven with purpose. Remembered forever.
              </p>
            </div>
            <div class="card-bottom">
              <span class="card-num">04</span>
            </div>
          </div>
        </div>

        <!-- Concluding Statement -->
        <div class="concluding-statement reveal-on-scroll">
          <span class="concluding-kicker">Built with obsession · Driven with purpose · Remembered forever.</span>
          <h3 class="concluding-title">DRIVE THE DREAM. LEAVE THE MARK.</h3>
          <div class="concluding-brand">FERRARI</div>
          <div class="concluding-horse-wrap">
            ${getHorseSvg(64, 'concluding-horse')}
          </div>
        </div>
      </div>
    </section>
  </main>
  
<script>
  window.FERRARI_API_BASE = 'https://ferrari-backend-wagn.onrender.com';
</script>
<script src="script.js?v=8"></script>
<script src="chat.js?v=1"></script>
  <script src="script.js?v=8"></script>
  <script src="chat.js?v=1"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent, 'utf8');
console.log('index.html built successfully, size:', htmlContent.length);
