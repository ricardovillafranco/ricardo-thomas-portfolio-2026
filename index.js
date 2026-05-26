document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFAQ();
  initAnimations();
});

function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  const closeMenu = () => {
    toggle.classList.remove('is-open');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('is-open');
    nav.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach((question) => {
    question.setAttribute('aria-expanded', 'false');

    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const wasOpen = question.classList.contains('active');

      questions.forEach((otherQuestion) => {
        otherQuestion.classList.remove('active');
        otherQuestion.setAttribute('aria-expanded', 'false');
        otherQuestion.nextElementSibling?.classList.remove('active');
      });

      if (!wasOpen) {
        question.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        answer?.classList.add('active');
      }
    });
  });
}

function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  if (prefersReducedMotion || !hasGSAP) {
    document.querySelectorAll('[data-animate]').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out' });

  gsap.set('[data-animate]', { autoAlpha: 0, y: 28 });
  if (document.querySelector('.hero-visual')) {
    gsap.set('.hero-visual', { autoAlpha: 0, y: 30, scale: 0.97 });
  }
  gsap.set('.hero-proof > div, .stack-chip', { autoAlpha: 0, y: 18 });

  const heroTl = gsap.timeline({ defaults: { duration: 0.75 } });
  heroTl
    .from('.site-header', { autoAlpha: 0, y: -20, duration: 0.55 })
    .to('.hero-copy', { autoAlpha: 1, y: 0, duration: 0.85 }, '-=0.15')

    .to('.hero-proof > div', { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.45 }, '-=0.45')
    .to('[data-animate="stack"]', { autoAlpha: 1, y: 0, duration: 0.42 }, '-=0.25')
    .to('.stack-chip', { autoAlpha: 1, y: 0, stagger: 0.045, duration: 0.42 }, '<');

  if (document.querySelector('.floating-card-a')) {
    gsap.to('.floating-card-a', { y: -12, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }
  if (document.querySelector('.floating-card-b')) {
    gsap.to('.floating-card-b', { y: 10, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }

  if (document.querySelector('.portrait-card')) {
    gsap.to('.portrait-card', {
      yPercent: -4,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8
      }
    });
  }

  document.querySelectorAll('[data-animate="fade-up"], [data-animate="case"]')
    .forEach((element) => {
      if (element.closest('.hero')) return;
      gsap.to(element, {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
        scrollTrigger: {
          trigger: element,
          start: 'top 84%',
          once: true
        }
      });
    });

  document.querySelectorAll('[data-animate="stagger"]').forEach((group) => {
    const children = group.children;
    gsap.to(group, {
      autoAlpha: 1,
      y: 0,
      duration: 0.4,
      scrollTrigger: {
        trigger: group,
        start: 'top 86%',
        once: true
      }
    });

    gsap.from(children, {
      autoAlpha: 0,
      y: 26,
      duration: 0.62,
      stagger: 0.08,
      scrollTrigger: {
        trigger: group,
        start: 'top 86%',
        once: true
      }
    });
  });

  gsap.utils.toArray('.process-card').forEach((card, index) => {
    gsap.to(card, {
      y: index % 2 === 0 ? -10 : 10,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8
      }
    });
  });
}
