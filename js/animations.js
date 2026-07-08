// ===== Kianoush Yazdanyar — animations.js =====

(function () {

  // ===== 1. Navn fade-in ved indlæsning =====
  const heroName = document.querySelector('.hero-name');
  const heroPortrait = document.querySelector('.hero-portrait');

  if (heroName) {
    heroName.style.opacity = '0';
    heroName.style.transform = 'translateY(28px)';
    heroName.style.transition = 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)';

    // Lille forsinkelse så browseren er klar
    setTimeout(() => {
      heroName.style.opacity = '1';
      heroName.style.transform = 'translateY(0)';
    }, 120);
  }

  if (heroPortrait) {
    heroPortrait.style.opacity = '0';
    heroPortrait.style.transform = 'translateY(20px)';
    heroPortrait.style.transition = 'opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1), transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)';

    setTimeout(() => {
      heroPortrait.style.opacity = '1';
      heroPortrait.style.transform = 'translateY(0)';
    }, 60);
  }

  // Felterne fader ind lidt efter
  const fieldGrid = document.querySelector('.field-grid');
  const privateLink = document.querySelector('.private-link');

  [fieldGrid, privateLink].forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.3 + i * 0.1}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.3 + i * 0.1}s`;

    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 60);
  });


  // ===== 2. Scroll-animationer =====
  // Tilføjer klasse til elementer der skal animeres ved scroll
  const scrollTargets = document.querySelectorAll(
    '.acc-item, .sub-section, .creative-item, .data-card, .sub-hero, .video-grid, .photo-grid, .sub-footer'
  );

  scrollTargets.forEach((el, i) => {
    el.classList.add('scroll-hidden');
    // Giver hvert element inden for samme gruppe en lille forsinkelse
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('scroll-hidden');
        entry.target.classList.add('scroll-visible');
        // Stop med at observere når elementet er synligt
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  scrollTargets.forEach(el => observer.observe(el));


  // ===== 3. Parallax på portræt =====
  const portrait = document.querySelector('.hero-portrait img');

  if (portrait) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Billedet bevæger sig 35% så langsomt som resten = dybde-illusion
          const offset = scrollY * 0.35;
          portrait.style.transform = `translateY(${offset}px) scale(1.1)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  // ===== Reduceret bevægelse: respekter brugerens OS-indstillinger =====
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.scroll-hidden').forEach(el => {
      el.classList.remove('scroll-hidden');
      el.classList.add('scroll-visible');
    });
  }

})();
