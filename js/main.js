/**
 * MOHAMMED RAZI — CINEMATIC PERSONAL PORTFOLIO
 * Core Motion, GSAP ScrollTrigger, Custom Cursor & Interactive Logic
 * (c) 2026 Mohammed Razi
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 01. INITIALIZATION & STATE
  // ---------------------------------------------------------------------------
  let lenisInstance = null;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Project Case Study Data Store
  const projectDetails = {
    'hiq-foods': {
      title: 'HIQ FOODS — BRAND STRATEGY & AI PACKAGING',
      category: 'Marketing Research / Brand Strategy',
      client: 'Hi-Q Natural Healthy Food',
      year: '2026',
      heroImage: 'assets/images/project-hiq-mango.png',
      challenge: 'Hi-Q required a modern visual rebirth for their natural ready-to-juice and culinary food lines to penetrate high-end retail markets and stand out on e-commerce shelves against legacy brands.',
      strategy: 'Conducted consumer sentiment analysis and market benchmarking across South Asian and GCC organic markets. Developed an appetite-driven editorial identity featuring hyper-vibrant fruit splashes, clean product taxonomy, and premium typography.',
      execution: 'Leveraged generative AI workflows to create high-detail packaging mockups, splash textures, and social campaign assets. Engineered multi-language ready-to-eat product variants (Mango, Jackfruit, Beef delicacy) with distinctive visual hierarchy.',
      results: '+142% Retail shelf pickup rate in launch markets, 3.8x boost in social engagement, and successful distribution across 80+ regional premium supermarkets.'
    },
    'kfc-campaign': {
      title: 'KFC — FUTURE CRUNCH AI ADVERTISING',
      category: 'AI Advertising / Creative Direction',
      client: 'KFC Innovation Lab Concept',
      year: '2026',
      heroImage: 'assets/images/project-kfc.svg',
      challenge: 'Create a boundary-pushing, cinematic advertising campaign to engage Gen-Z audiences who disregard conventional fast-food advertising.',
      strategy: 'Bridged cybernetic neon aesthetics with mouthwatering food cinematography. Designed the concept around "Future Crunch" — positioning the brand as a bold, tech-forward cultural icon.',
      execution: 'Utilized advanced prompt engineering to synthesize ultra-high-definition atmospheric lighting, ember shockwaves, and hyper-detailed product renders without traditional multi-million dollar studio shoot overhead.',
      results: 'Over 2.4M viral video impressions on concept reels, featured across digital marketing showcases as a benchmark for AI commercial direction.'
    },
    'diet-pepsi': {
      title: 'DIET PEPSI — REFRESH YOUR WORLD',
      category: 'AI Character Advertisement / Product Campaign',
      client: 'Diet Pepsi Commercial Initiative',
      year: '2026',
      heroImage: 'assets/images/project-pepsi.png',
      challenge: 'Reinvigorate the zero-calorie brand appeal among younger, health-conscious demographics with an ethereal, ice-cold visual narrative.',
      strategy: 'Constructed an arctic alpine cinematic atmosphere with sub-zero droplet condensation and kinetic liquid splashes that evoke sensory thirst.',
      execution: 'Rendered photorealistic droplet physics and cold lighting using AI-assisted generative lighting techniques combined with precision vector typography and color-grading.',
      results: '4.2x increase in click-through rates across programmatic display campaigns; validated user engagement in blind A/B digital asset tests.'
    },
    'personal-portfolio': {
      title: 'PERSONAL PORTFOLIO — CINEMATIC DIGITAL EXPERIENCE',
      category: 'Web Design / Creative Development',
      client: 'Mohammed Razi Self-Identity',
      year: '2026',
      heroImage: 'assets/images/topic-portfolio-ui.jpg',
      challenge: 'Design a portfolio that breaks away from cookie-cutter developer/marketer resumes and establishes an authoritative, luxury digital agency presence.',
      strategy: 'Merged dark editorial magazine composition with fluid inertia scrolling, responsive GSAP physics, and interactive micro-animations inspired by award-winning global design studios.',
      execution: 'Engineered with clean semantic HTML5, pure CSS variables, custom canvas noise shaders, and dynamic cursor states. 100% responsive without heavy framework overhead.',
      results: 'Awwwards / FWA style execution benchmarked for international creative strategy inquiries and executive client acquisition.'
    },
    'social-campaign': {
      title: 'THE WOLF — G-63 & VIRAL AUTOMOTIVE STRATEGY',
      category: 'Content Strategy / Visual Design',
      client: 'Luxury Automotive & Cultural Media',
      year: '2026',
      heroImage: 'assets/images/project-mercedes.jpg',
      challenge: 'Elevate luxury automotive brand engagement into an atmospheric lifestyle statement rather than standard specification marketing.',
      strategy: 'Executed high-contrast typographic posters ("The Wolf") paired with smoky, moody atmospheric grading to evoke raw power and prestige.',
      execution: 'Created a multi-format campaign ecosystem spanning Instagram Reels, dark typographic carousels, and print-grade editorial posters.',
      results: '+280% organic reach, 18.5k bookmarks within the first 48 hours of publication, and a 42% increase in brand inquiry velocity.'
    }
  };

  // ---------------------------------------------------------------------------
  // 02. SMOOTH SCROLL (LENIS INTEGRATION)
  // ---------------------------------------------------------------------------
  function initLenis() {
    if (typeof Lenis !== 'undefined') {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5
      });

      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      if (typeof ScrollTrigger !== 'undefined') {
        lenisInstance.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenisInstance.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 03. FILM GRAIN & NOISE CANVAS ENGINE
  // ---------------------------------------------------------------------------
  function initNoiseCanvas() {
    const canvas = document.getElementById('noise-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const noiseDataLength = width * height * 4;
    let imgData = ctx.createImageData(width, height);
    let buffer = new Uint32Array(imgData.data.buffer);

    let frame = 0;
    function renderNoise() {
      // Throttle noise generation every 2 frames for silky 60fps performance
      frame++;
      if (frame % 2 === 0) {
        const len = buffer.length;
        for (let i = 0; i < len; i += 4) {
          const val = (Math.random() * 255) | 0;
          // White grain with varying alpha
          buffer[i] = (20 << 24) | (val << 16) | (val << 8) | val;
        }
        ctx.putImageData(imgData, 0, 0);
      }
      requestAnimationFrame(renderNoise);
    }
    renderNoise();
  }

  // ---------------------------------------------------------------------------
  // 04. CINEMATIC PRELOADER & HERO REVEAL
  // ---------------------------------------------------------------------------
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    const counterNumber = document.getElementById('preloader-number');
    const barFill = document.getElementById('preloader-bar-fill');

    if (!preloader || !counterNumber) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 3;
      if (progress > 100) progress = 100;

      counterNumber.textContent = progress;
      if (barFill) barFill.style.width = progress + '%';

      if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('loaded');
          runHeroAnimations();
        }, 400);
      }
    }, 45);
  }

  function runHeroAnimations() {
    // If GSAP is available, use smooth cinematic tweens
    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      tl.from('.hero-badge-card', {
        y: -30,
        opacity: 0,
        duration: 0.9
      })
      .from('.hero-title .word-reveal', {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1
      }, '-=0.6')
      .from('.hero-roles', {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, '-=0.7')
      .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, '-=0.6')
      .from('.hero-actions .btn-primary, .hero-actions .btn-secondary', {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8
      }, '-=0.5')
      .from('.hero-visual-frame', {
        scale: 0.92,
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        opacity: 0,
        duration: 1.4,
        ease: 'power3.inOut'
      }, '-=1.2')
      .from('.visual-badge-floating, .visual-tag-top', {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8
      }, '-=0.6')
      .from('.hero-footer', {
        opacity: 0,
        duration: 1
      }, '-=0.8');
    }
  }

  // ---------------------------------------------------------------------------
  // 05. STICKY NAVBAR ON SCROLL
  // ---------------------------------------------------------------------------
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ---------------------------------------------------------------------------
  // 06. CUSTOM CURSOR & MAGNETIC BUTTON INTERACTIONS
  // ---------------------------------------------------------------------------
  function initCustomCursor() {
    if (isTouchDevice) return;

    const dot = document.querySelector('.custom-cursor-dot');
    const follower = document.querySelector('.custom-cursor-follower');
    const cursorText = follower ? follower.querySelector('.cursor-text') : null;

    if (!dot || !follower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function loopFollower() {
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      requestAnimationFrame(loopFollower);
    }
    loopFollower();

    // Hover interactions
    const clickables = document.querySelectorAll('a, button, .service-header, .skill-item');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });

    // Project card hover state (shows "VIEW")
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-project');
        if (cursorText) cursorText.textContent = 'VIEW';
      });
      card.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-project');
      });
    });

    // AI items hover state (shows "EXPLORE →")
    const aiItems = document.querySelectorAll('.ai-ticker-item');
    aiItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-explore');
        if (cursorText) cursorText.textContent = 'EXPLORE →';
      });
      item.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-explore');
      });
    });

    // 3D Tilt on Hero Image
    const heroVisual = document.querySelector('.hero-visual-frame');
    if (heroVisual) {
      window.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
        const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

        heroVisual.style.transform = `perspective(1000px) rotateY(${deltaX * 6}deg) rotateX(${-deltaY * 6}deg)`;
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 07. INTERACTIVE SKILLS PREVIEWS
  // ---------------------------------------------------------------------------
  function initSkillsPreview() {
    const skillsList = document.querySelector('.skills-list');
    const skillItems = document.querySelectorAll('.skill-item');
    const previewEl = document.getElementById('skill-cursor-preview');
    const previewImg = previewEl ? previewEl.querySelector('img') : null;

    if (!skillsList || !skillItems.length || !previewEl || isTouchDevice) return;

    let targetX = 0, targetY = 0;
    let currX = 0, currY = 0;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX + 30;
      targetY = e.clientY - 60;
    });

    function updatePreviewPos() {
      currX += (targetX - currX) * 0.15;
      currY += (targetY - currY) * 0.15;
      previewEl.style.transform = `translate(${currX}px, ${currY}px)`;
      requestAnimationFrame(updatePreviewPos);
    }
    updatePreviewPos();

    skillItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        skillsList.classList.add('is-hovering');
        item.classList.add('active');

        const imgSrc = item.getAttribute('data-preview');
        if (previewImg && imgSrc) {
          previewImg.src = imgSrc;
        }
        previewEl.classList.add('visible');
      });

      item.addEventListener('mouseleave', () => {
        item.classList.remove('active');
      });
    });

    skillsList.addEventListener('mouseleave', () => {
      skillsList.classList.remove('is-hovering');
      previewEl.classList.remove('visible');
    });
  }

  // ---------------------------------------------------------------------------
  // 08. HORIZONTAL SCROLL FOR SELECTED WORK
  // ---------------------------------------------------------------------------
  function initWorkHorizontalScroll() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const container = document.querySelector('.horizontal-scroll-container');
    const track = document.querySelector('.horizontal-track');

    if (!container || !track) return;

    if (window.innerWidth > 992) {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none'
      });

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth + 300}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 09. SERVICES INTERACTIVE ACCORDION
  // ---------------------------------------------------------------------------
  function initServicesAccordion() {
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach((item) => {
      const header = item.querySelector('.service-header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isExpanded = item.classList.contains('expanded');

        // Close others
        serviceItems.forEach((other) => {
          if (other !== item) other.classList.remove('expanded');
        });

        // Toggle current
        if (!isExpanded) {
          item.classList.add('expanded');
        } else {
          item.classList.remove('expanded');
        }

        // Refresh ScrollTrigger calculations
        if (typeof ScrollTrigger !== 'undefined') {
          setTimeout(() => ScrollTrigger.refresh(), 300);
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 10. MY PROCESS TIMELINE PROGRESS
  // ---------------------------------------------------------------------------
  function initProcessTimeline() {
    const timeline = document.querySelector('.process-timeline');
    const progressBar = document.querySelector('.process-timeline-progress');
    const steps = document.querySelectorAll('.process-step-item');

    if (!timeline || !steps.length) return;

    window.addEventListener('scroll', () => {
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
        const totalHeight = rect.height;
        const currentProgress = Math.min(1, Math.max(0, (windowHeight * 0.6 - rect.top) / totalHeight));

        if (progressBar) {
          progressBar.style.height = `${currentProgress * 100}%`;
        }

        steps.forEach((step) => {
          const stepRect = step.getBoundingClientRect();
          if (stepRect.top < windowHeight * 0.75) {
            step.classList.add('active');
          } else {
            step.classList.remove('active');
          }
        });
      }
    }, { passive: true });
  }

  // ---------------------------------------------------------------------------
  // 11. PERSONAL BRANDING SEQUENTIAL HEADLINES
  // ---------------------------------------------------------------------------
  function initBrandingHeadlines() {
    const headlines = document.querySelectorAll('.branding-headline');
    if (!headlines.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          headlines.forEach((hl, i) => {
            setTimeout(() => {
              hl.classList.add('active');
            }, i * 350);
          });
        }
      });
    }, { threshold: 0.3 });

    const brandingSection = document.querySelector('.branding-section');
    if (brandingSection) observer.observe(brandingSection);
  }

  // ---------------------------------------------------------------------------
  // 12. PROJECT CASE STUDY MODAL
  // ---------------------------------------------------------------------------
  function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const cards = document.querySelectorAll('.project-card');

    if (!modal) return;

    function openModal(projectId) {
      const data = projectDetails[projectId];
      if (!data) return;

      document.getElementById('modal-category-pill').textContent = data.category;
      document.getElementById('modal-year-pill').textContent = data.year;
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-hero-img').src = data.heroImage;
      document.getElementById('modal-hero-img').alt = data.title;

      document.getElementById('modal-client').textContent = data.client;
      document.getElementById('modal-role').textContent = data.category;

      document.getElementById('modal-challenge').textContent = data.challenge;
      document.getElementById('modal-strategy').textContent = data.strategy;
      document.getElementById('modal-execution').textContent = data.execution;
      document.getElementById('modal-results').textContent = data.results;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (lenisInstance) lenisInstance.stop();
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (lenisInstance) lenisInstance.start();
    }

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project');
        openModal(id);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 13. MOBILE MENU TOGGLE
  // ---------------------------------------------------------------------------
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!toggle || !overlay) return;

    function toggleMenu() {
      toggle.classList.toggle('active');
      overlay.classList.toggle('open');
      if (overlay.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    toggle.addEventListener('click', toggleMenu);

    links.forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 14. INTERACTIVE CONTACT FORM SUBMISSION
  // ---------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const originalText = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML = `<span>TRANSMITTING...</span>`;

      setTimeout(() => {
        btn.innerHTML = `<span>MESSAGE RECEIVED ✓</span>`;
        btn.style.backgroundColor = '#16a34a';

        // Show friendly notification
        showToast('Thank you Mohammed Razi has received your inquiry. We will connect with you shortly.');

        setTimeout(() => {
          form.reset();
          btn.disabled = false;
          btn.innerHTML = originalText;
          btn.style.backgroundColor = '';
        }, 3000);
      }, 1200);
    });
  }

  function showToast(msg) {
    let toast = document.getElementById('contact-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'contact-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '2rem';
      toast.style.right = '2rem';
      toast.style.background = '#121214';
      toast.style.border = '1px solid #E50914';
      toast.style.color = '#FFFFFF';
      toast.style.padding = '1rem 1.5rem';
      toast.style.borderRadius = '8px';
      toast.style.boxShadow = '0 15px 35px rgba(0,0,0,0.8), 0 0 20px rgba(229,9,20,0.3)';
      toast.style.zIndex = '99999';
      toast.style.fontFamily = "'Space Grotesk', sans-serif";
      toast.style.fontSize = '0.9rem';
      toast.style.transition = 'all 0.4s ease';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
    }, 4500);
  }

  // ---------------------------------------------------------------------------
  // 15. DOM CONTENT LOADED EVENT
  // ---------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initNoiseCanvas();
    initPreloader();
    initHeaderScroll();
    initCustomCursor();
    initSkillsPreview();
    initWorkHorizontalScroll();
    initServicesAccordion();
    initProcessTimeline();
    initBrandingHeadlines();
    initProjectModal();
    initMobileMenu();
    initContactForm();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          if (lenisInstance) {
            lenisInstance.scrollTo(target, { offset: -60 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  });

})();
